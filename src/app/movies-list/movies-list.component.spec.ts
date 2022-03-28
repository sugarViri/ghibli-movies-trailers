import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        MoviesListComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: []
    }).overrideComponent(MoviesListComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #onDetail()', async () => {
    component.onDetail({});
  });

  it('should run #onFavMovie()', async () => {
    component.onFavMovie({});
  });

});
