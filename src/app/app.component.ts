import { Component, OnInit, OnDestroy, AfterContentChecked, Inject, PLATFORM_ID, ViewChild, ElementRef, Renderer2, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { Subscription, asyncScheduler } from 'rxjs';
import { FavsService } from './services/favs.service';
import { MoviesService } from './services/movies.service';
import { LocationStrategy, isPlatformBrowser } from '@angular/common';
import { filter, scan, observeOn } from 'rxjs/operators';

interface ScrollPositionRestore {
  event: Event;
  positions: { [K: number]: number };
  trigger: 'imperative' | 'popstate';
  idToRestore: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']/* ,
  changeDetection: ChangeDetectionStrategy.OnPush, */
})


export class AppComponent implements OnInit, OnDestroy {

  title = 'Ghibli Tour';
  subscriptions: Array<Subscription> = [];
  auxMovies: Array<any> = [];
  auxTrailer: Array<any> = [];
  moviesList: Array<any> = [];
  updatedFavs: Array<any> = [];
  itemsStore: Array<any> = [];
  detailMovie: any = {
    fav: false,
    id: 'Test'
  };
  actualView: string = '';
  actualRoute: string = '';
  itemSelected: any;
  viewSelected: any;
  isFavView: boolean = false;
  activedRoute: any;

  private _isPopState = false;
  private _routeScrollPositions: { [url: string]: number } = {};
  private _deferredRestore = false;
  listener: any;
  lastScrollPos: number = 0;
  private unlistener: () => void = {} as any;
  isScrollEnded: boolean = true;
  clickDetail: boolean = false;
  clickBack: boolean = false;

  @ViewChild('contentArea') public contentArea: ElementRef<any> = {} as ElementRef;

  constructor(
    private router: Router,
    private moviesData: MoviesService,
    private favData: FavsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private locStrat: LocationStrategy,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.getSubscriptions();
    this.unlistener = this.renderer.listen('window', 'scroll', (e) => {
      this.getYPosition(e);
    });
  }

  getSubscriptions() {
    this.subscriptions.push(this.favData.itemsObservable$.subscribe((items: Array<any>) => {
      this.itemsStore = items;
    }));

    this.subscriptions.push(this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.actualRoute = event.url;
        this.getActualView();
      }
    }));

    this.moviesData.getJSON().subscribe((items: Array<any>) => {
      this.moviesList = items;
      this.favData.storeMovies(this.moviesList);
    });

    this.subscriptions.push(this.favData.favViewObservable$.subscribe((item: any) => {
      this.isFavView = item;
    }));

    this.subscriptions.push(this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart || event instanceof NavigationEnd,
        ),
        scan<Event, ScrollPositionRestore>((acc, event) => ({
          event,
          positions: {
            ...acc.positions,
            ...(event instanceof NavigationStart
              ? {
                [event.id]: this.lastScrollPos
              }
              : {}),
          },
          trigger:
            event instanceof NavigationStart
              ? event.navigationTrigger as 'imperative' || 'popstate'
              : acc.trigger,
          idToRestore:
            (event instanceof NavigationStart &&
              event.restoredState &&
              event.restoredState.navigationId + 1) ||
            acc.idToRestore,
        })),
        filter(
          ({ event, trigger, positions, idToRestore }) => event instanceof NavigationEnd && !!trigger,
        ),
        observeOn(asyncScheduler),
      )
      .subscribe(({ trigger, positions, idToRestore }) => {
        if (trigger === 'popstate') {
          const scrollAmount = this.favData.getScrolledLength();
          if (scrollAmount !== undefined) {
            setTimeout(() => {
              window.scroll({ top: scrollAmount, left: 0, behavior: 'smooth' });
            }, 300);
          }
        }
      })
    )
  }

  getActualView() {
    if (this.actualRoute === '/movies-list') {
      this.actualView = 'isListView';
      this.favData.selectView({ actualView: 'isListView' });
    } else if (this.actualRoute.includes('/movie-detail')) {
      this.actualView = 'isDetailView';
      this.favData.selectView({ actualView: 'isDetailView' });
    } else if (this.actualRoute === '/movies-favs' && this.itemsStore.length === 0) {
      this.goHome();
    } else if (this.actualRoute === '/movies-favs') {
      this.actualView = 'isFavView';
      this.favData.selectView({ actualView: 'isFavView' });
    } else if (this.actualRoute === '') {
      this.actualView = 'isHomeView';
      this.favData.selectView({ actualView: 'isHomeView' });
    }
  }

  goHome() {
    this.favData.selectHome();
    this.favData.selectView({ actualView: 'isHomeView' });
    this.router.navigate(['']);
  }

  goFavs() {
    if (this.itemsStore.length > 0) {
      this.favData.setScrollLength(this.lastScrollPos);
      this.favData.selectFav();
      this.favData.selectView({ actualView: 'isFavView' });
      this.router.navigate(['/movies-favs/']);
      setTimeout(() => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
      }, 100);
    }
  }

  ngAfterContentChecked(): void {
    this.getActualView();
  }

  getYPosition(e: any): number {
    return this.lastScrollPos = (e.target.scrollingElement).scrollTop;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: any) => subs.unsubscribe());
    if (this.unlistener) {
      this.unlistener();
    }
  }
}
