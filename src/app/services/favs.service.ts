import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavsService {
  private items: Array<any> = []
  private itemsSubject = new Subject<any>();
  public itemsObservable$ = this.itemsSubject.asObservable();

  private itemsMovies:Array<any> = [];
  private itemsMoviesSubject = new Subject<any>();
  public itemsMoviesObservable$ = this.itemsMoviesSubject.asObservable();

  private itemView: any;
  public itemViewSubject = new Subject<any>();
  public itemViewObservable$ = this.itemViewSubject.asObservable();

  private favView: any;
  public favViewSubject = new Subject<any>();
  public favViewObservable$ = this.favViewSubject.asObservable();

  private itemMovie: any;
  private itemMovieSubject = new Subject<any>();
  public itemMovieObservable$ = this.itemMovieSubject.asObservable();

  private scrolledPage!: number | undefined;
  private scrolledPageSubject = new Subject<any>();
  public scrolledPageObservable$ = this.scrolledPageSubject.asObservable();

  constructor() { }

  setScrollLength(length: number | undefined) {
    this.scrolledPage = length;
    this.scrolledPageSubject.next(this.scrolledPage)
  }

  getScrolledLength() {
    return this.scrolledPage;
  }

  addItem(item: any) {
    this.items.push(item);
    this.itemsSubject.next(this.items);
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.itemsSubject.next(this.items);
  }

  getFavItems() {
    return this.items;
  }

  storeMovies(movies: Array<any>) {
    this.itemsMovies = movies;
    this.itemsMoviesSubject.next(this.itemsMovies)
  }

  getMovies() {
    return this.itemsMovies;
  }

  checkTrailer(movie: any) {
    this.itemsMovies = this.itemsMovies.map((mv) => {
      const match = this.itemsMovies.find((item) => {
        return mv.id === movie.id;
      });
      if (match) {
        mv.checked = true;
      } else {
        mv.checked = mv.checked;
      }
      return mv;
    });
    this.itemsMoviesSubject.next(this.itemsMovies);
  }

  orderFavourites(score: number | null, index: number) {
    this.items = this.items.map((fv, idx: number) => {
      const match = this.items.find((it) => {
        return idx === index;
      });
      if (match) {
        fv.score = score;
      } else {
        if (fv.score != 0 && fv.score != null) {
          fv.score = fv.score;
        } else {
          fv.score = null;
        }
      }
      return fv;
    });

    this.items.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 1;
      return 0;
    });

    this.itemsSubject.next(this.items);
  }

  selectMovie(movie: any) {
    this.itemMovie = movie;
    this.itemMovieSubject.next(this.itemMovie);
  }

  getMovie() {
    return this.itemMovie;
  }

  selectView(view: any) {
    this.itemView = view.actualView;
    this.itemViewSubject.next(this.itemView);
  }

  getSelectedView(): any {
    return this.itemView;
  }

  selectFav() {
    this.favView = true;
    this.favViewSubject.next(this.favView);
  }

  selectHome() {
    this.favView = false;
    this.favViewSubject.next(this.favView);
  }
}
