import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { MoviesService } from './services/movies.service';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavsService } from './services/favs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentChecked {

  title = 'Ghibli Tour';
  subscriptions: Array<Subscription> = [];
  auxMovies: Array<any> = [];
  moviesList: Array<any> = [];
  updatedFavs: Array<any> = [];
  itemsStore: Array<any> = [];
  detailMovie: any = {
    fav: false,
    id: 'Test'
  };
  actualView: string = '';
  actualRoute: string = '';

  constructor(
    private router: Router,
    private favData: FavsService,
    private moviesData: MoviesService,
  ) { }

  ngOnInit(): void {
    this.getSubscriptions();
  }

  ngAfterContentChecked(): void {
    this.getActualView();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: any) => subs.unsubscribe());
  }

  getSubscriptions() {
    this.subscriptions.push(this.favData.itemsObservable$.subscribe((items: Array<any>) => {
      this.itemsStore = items;
    }));

    this.subscriptions.push(this.moviesData.movies().subscribe((data) => {
      this.auxMovies.push(data);
      this.moviesList = this.auxMovies[0];
    }));

    this.subscriptions.push(this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.actualRoute = event.url;
        this.getActualView();
      }
    }));
  }

  // TODO: cambiar por un switch?
  getActualView() {
/*     switch (this.actualRoute) {
      case '/movies-list':
        this.actualView = 'isListView';
        break;
      case '/movie-detail' || '/movies-detail/:id ':
        this.actualView = 'isDetailView';
        break;
      case '/movies-favs':
          this.actualView = 'isFavView';
        break;
      case '':
        this.actualView = 'isListView';
        break;
      default:
        this.actualView = 'isListView';
    } */

    if (this.actualRoute === '/movies-list') {
      this.actualView = 'isListView';
    } else if (this.actualRoute.includes('/movie-detail')) {
      this.actualView = 'isDetailView';
    } else if (this.actualRoute === '/movies-favs' && this.updatedFavs.length === 0) {
      this.goHome();
    } else if (this.actualRoute === '/movies-favs') {
      this.actualView = 'isFavView';
    } else if (this.actualRoute === '') {
      this.actualView = 'isListView';
    }
  }

  onUpdateFav(favs: any) {
    if (!favs.fav) {
      const idx = this.updatedFavs.findIndex((favObj: any) => {
        return favObj.id === favs.id
      });
      this.favData.deleteItem(idx);

      this.updatedFavs = this.updatedFavs.filter((fv) => {
        return fv.id != favs.id
      })
      console.log('Fav delete: ', this.itemsStore);
    } else {
      this.updatedFavs.push(favs.movie);
      this.favData.addItem(favs.movie);
      console.log('Fav add: ', this.itemsStore);
    }

    this.moviesList = this.moviesList.map((mv: any) => {
      const match = this.updatedFavs.find((fv) => {
        return mv.id === fv.id
      });
      if (match) {
        mv.fav = true;
      } else {
        mv.fav = false;
      }
      return mv;
    })
  }

  onDetail(mov: any) {
    this.detailMovie = mov;
    this.router.navigate(['/movie-detail/', mov.id]);
  }

  goHome() {
    this.router.navigate(['/movies-list/']);
  }

  goFavs() {
    if (this.updatedFavs.length > 0) {
      this.router.navigate(['/movies-favs/']);
    }
  }
}
