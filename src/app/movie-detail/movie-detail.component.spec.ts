import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MovieDetailComponent } from './movie-detail.component';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { FavsService } from '../services/favs.service';
import { serviceFavMockTest } from './movie-detail.models';

const serviceFavMock = serviceFavMockTest;

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
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useValue: serviceRouterMock },
        { provide: FavsService, useValue: serviceFavMock }
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
    component.ngOnInit();
  });

  it('should run #getSubscriptions()', async () => {
    component.getSubscriptions();
  });

  it('should run #onCheckTrailer', async () => {
    component.onCheckTrailer('Visto');
    component.onCheckTrailer('Otro');

  });
  it('should run #ngOnDestroy', async () => {
    component.ngOnDestroy()
  });

  it('should run #toggleFav()', async () => {
    component.movieDetail = {
      fav: true,
      id: '2baf70d1-42bb-4437-b551-e5fed5a87abe'
    }
    component.toggleFav();
    component.movieDetail = {
      fav: false,
      id: '2baf70d1-42bb-4437-b551-e5fed5a87abe'
    }
    component.itemsFav = [{ id: '2baf70d1-42bb-4437-b551-e5fed5a87abe' }]
    component.toggleFav();
    component.toggleFav();
});

});
