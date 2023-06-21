import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { of } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { AppComponent } from './app.component';
import { FavsService } from './services/favs.service';
import { MoviesService } from './services/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const serviceMoviesMock = {
  getMovies() {
    return of([{ body: [{ id: "1", image: '12', original_title: 'title' }] }])
  },
  getJSON() {
    return of([{ body: {films: [{ id: "1", image: '12', original_title: 'title' }]} }])
  }
}
const serviceFavMock = {
  itemsObservable$: of([{
    fav: true,
    id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    movie: {
      description: "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
      director: "Hayao Miyazaki",
      id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
      image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
      movie_banner: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg",
      original_title: "天空の城ラピュタ",
      original_title_romanised: "Tenkū no shiro Rapyuta",
      release_date: "1986",
      rt_score: "95",
      running_time: "124",
      title: "Castle in the Sky",
      url: "https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe"
    }
  }]),
  favViewObservable$: of('view'),
  addItem(item: any) {
    return of([]);
  },
  deleteItem(index: number) {
    return of([]);
  },
  storeMovies() {
    return of([])
  },
  selectView({}) {
    return of({})
  },
  selectHome() {
    return of({})
  },
  selectFav() {
    return of({})
  }
}
let serviceRouterMock = {
  events: of(new NavigationStart(123, '/movies-list')),
  navigate() {
    return of(['/movie-detail/', 'Test'])
  }
}

const auxMoviesMock = [{
  fav: false,
  id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  movie: {
    description: "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
    director: "Hayao Miyazaki",
    id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
    movie_banner: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg",
    original_title: "天空の城ラピュタ",
    original_title_romanised: "Tenkū no shiro Rapyuta",
    release_date: "1986",
    rt_score: "95",
    running_time: "124",
    title: "Castle in the Sky",
    url: "https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe"
  }



}]

describe('AppComponent', () => {
  let component: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
      declarations: [
        AppComponent, MoviesListComponent, MovieDetailComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useValue: serviceRouterMock },
        { provide: MoviesService, useValue: serviceMoviesMock },
        { provide: FavsService, useValue: serviceFavMock },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: Renderer2, useValue: {listen: () => ({})}}
      ]
    }).overrideComponent(AppComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () { };
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #constructor variables()', async () => {
    expect(component.auxMovies).toEqual([]);
  });

  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
  });

  it('should run #ngAfterContentChecked()', async () => {
    component.ngAfterContentChecked();
  });

  it('should run #getSubscriptions()', async () => {
    component.getSubscriptions();
  });

  it('should run #ngOnDestroy()', async () => {
    component.subscriptions = [{ unsubscribe: () => { } }]
    component.unlistener = () => ({});
    component.ngOnDestroy();
  });

  it('should run #getActualView()', async () => {
    component.actualRoute = '/movies-list'
    component.getActualView();
    component.actualRoute = '/movie-detail'
    component.getActualView();
    component.actualRoute = '/movies-favs'
    component.itemsStore = [{ fav: true, id: 'Test' }];
    component.getActualView();
    component.actualRoute = '/movies-favs'
    component.itemsStore = [];
    const spy = jest.spyOn(component, 'goHome');
    component.getActualView();
    expect(spy).toHaveBeenCalled();
    component.actualRoute = ''
    component.getActualView();
  });

  it('should run #goHome()', async () => {
    component.goHome();
  });

  it('should run #goFavs()', async () => {
    component.itemsStore = [{ fav: false, id: 'Test' }];
    component.favData.setScrollLength = () => ({});
    component.goFavs();
    component.itemsStore = [];
    component.goFavs();
  });


});
