import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MovieDetailComponent } from './movie-detail.component';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MoviesListComponent } from '../movies-list/movies-list.component';
/* import { APP_BASE_HREF } from '@angular/common'; */
import { FavsService } from '../services/favs.service';
import { RouterTestingModule } from '@angular/router/testing';

const serviceFavMock = {
  itemsObservable$: of([{
      fav: true,
      id:"2baf70d1-42bb-4437-b551-e5fed5a87abe",
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
  }])
}
const serviceRouterMock = {
  navigate() {
    return of(['/movie-detail/', 'Test'])
  }
}

describe('MovieDetailComponent', () => {
  let component: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule],
      declarations: [
        MovieDetailComponent, MoviesListComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useValue: serviceRouterMock },
        { provide: FavsService, useValue: serviceFavMock }/* ,
        { provide: APP_BASE_HREF, useValue: '/' } */
      ]
    }).overrideComponent(MovieDetailComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.movie = {fav:false, id: 'Test'}
    component.ngOnInit();
  });

  it('should run #toggleFav()', async () => {
    component.movie = {fav:false, id: 'Test'}
    component.toggleFav();
    component.toggleFav();
  });

  it('should run #favIcon() fav is false', async () => {
    component.movie = { fav:false, id: 'Test' }
    const res = component.favIcon();
    expect(res).toEqual('fav-icon');

  });
  it('should run #favIcon() fav is true', async () => {
    component.movie = {fav:false, id: 'Test'}
    component.toggleFav();
    const res = component.favIcon();
    expect(res).toEqual('fav-icon-fav');
  });

  it('should run #tooltipText() fav is false', async () => {
    component.movie = {fav:false, id: 'Test'}
    const res = component.tooltipText();
    expect(res).toEqual('Add To Favs');
  });

  it('should run #tooltipText() fav is false', async () => {
    component.movie = {fav:false, id: 'Test'};
    component.toggleFav();
    const res = component.tooltipText();
    expect(res).toEqual('Remove Fav');
  });

  it('should run #showDetail()', async () => {
    component.movie = { fav:false, id: 'Test' }
    component.showDetail();
  });

});
