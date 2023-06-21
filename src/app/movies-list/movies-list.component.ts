import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavsService } from '../services/favs.service';
import { ImageLoadService } from '../services/image-load.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy, AfterViewInit {

  subscriptions: Array<Subscription> = [];

  isFavourites: boolean = false;
  moviesList: Array<any> = [];
  favList: Array<any> = [];
  updatedList: Array<any> = [];
  actualRoute: string = '';
  inputScore: number | null = null;
  createRanking!: FormGroup;
  showWarning: boolean = false;
  warningMessge: string = 'Enter a valid score';
  imagesLoaded: number = 1;
  areLoaded: boolean = false;
  isLoading: boolean = true;
  scrollLength: number | undefined;
  lastScrollPos: number | undefined;
  private unlistener: () => void = {} as any;

  @ViewChild('inputRef') scoreRef: any;
  @ViewChild('refFavList') favListRef: any;

  constructor(
    private favData: FavsService,
    private router: Router,
    private imgLoaded: ImageLoadService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.createRanking = this.fb.group({
      fullScore: new FormControl('', [Validators.required, this.customValidator()])
    });

    this.getSubscriptions();

  }

  ngAfterViewInit(): void {
    if (this.actualRoute === 'isFavView') {
      setTimeout(() => {
        this.isLoading = false
      }, 560)
    } else {
      setTimeout(() => {
        this.isLoading = false
      }, 860)
    }

  }

  getSubscriptions() {
    this.unlistener = this.renderer.listen('window', 'scroll', (e) => {
      this.getYPosition(e);
    });

    this.subscriptions.push(this.favData.itemsMoviesObservable$.subscribe((items: Array<any>) => {
      this.updatedList = items;
    }));

    this.subscriptions.push(this.favData.itemsObservable$.subscribe((itemsFav: Array<any>) => {
      this.favList = itemsFav;
    }));

    this.subscriptions.push(this.imgLoaded.imagesLoading$.subscribe((item: any) => {
      this.imagesLoaded = item;
      this.checkLoaded(item);
    }));

    this.moviesList = this.favData.getMovies();
    this.favList = this.favData.getFavItems();
    this.updateList();
    this.actualRoute = this.favData.getSelectedView();
    this.getView();
    if (this.actualRoute === 'isFavView') {
      setTimeout(() => {
        this.isLoading = false
      }, 560)
    } else {
      setTimeout(() => {
        this.isLoading = false;
      }, 860)
    }

  }

  checkLoaded(imagesLoaded: number) {
    if (imagesLoaded === 0) {
      return this.areLoaded = true;
    } else {
      return this.areLoaded = false;
    }
  }

  updateList() {
    this.updatedList = this.moviesList.map((mv: any) => {
      const match = this.favList.find((fv: any) => {
        return mv.id === fv.id
      });
      if (match) {
        mv.fav = true;
      } else {
        mv.fav = false;
      }
      return mv;
    });
  }

  getView() {
    this.actualRoute === 'isFavView' ? this.isFavourites = true : this.isFavourites = false;
  }

  showDetail(movie: any) {
    this.favData.setScrollLength(this.lastScrollPos);
    movie.wrongScore = false;
    this.showWarning = false;
    this.favData.selectMovie(movie);
    this.favData.selectView({ actualView: 'isDetailView' });
    this.router.navigate(['/movies-list/movie-detail/', movie.id]);
  }

  getYPosition(e: any): number {
    return this.lastScrollPos = (e.target.scrollingElement).scrollTop;
  }

  toggleFav(movie: any) {
    movie.fav = !movie.fav;
    if (!movie.fav) {
      const idx = this.favList.findIndex((favObj: any) => {
        return favObj.id === movie.id
      });
      this.favData.deleteItem(idx);
    } else {
      this.favData.addItem(movie);
    }
  }

  favClass(movie: any): string {
    return !movie.fav ? 'fav-icon' : 'fav-icon-fav';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: any) => subs.unsubscribe());
    if (this.unlistener) {
      this.unlistener();
    }
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value > 10 || control.value < 0;
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    }
  }

  limitNumberLength(event: any) {
    if (this.createRanking.value.fullScore != null) {
      if (this.createRanking.value.fullScore.toString().length >= 2) {
        this.createRanking.value.fullScore.patchValue = parseInt(this.createRanking.value.fullScore.toString().slice(0, 1));
      }
    }
  }

  clearScore(fav: any) {
    fav.wrongScore = false;
    this.showWarning = false;
  }

  addScore(input: number | null, idx: number, fav: any) {
    if (this.createRanking.invalid) {
      fav.wrongScore = true;
      this.showWarning = true;
    } else {
      fav.wrongScore = false;
      this.showWarning = false;
      this.favData.orderFavourites(input, idx);
      this.favList = this.favData.getFavItems();
    }

  }
}
