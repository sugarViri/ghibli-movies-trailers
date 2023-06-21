import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import { DialogContentComponent } from './dialog-content.component';

const moviesTrailerMock = {
  getVideoFrame() {
    return of("https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe")
  }
}

describe('DialogContentComponent', () => {
  let component: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: MoviesService, useValue: moviesTrailerMock },
        { provide: MatDialogRef, useValue: { close: () => 'Closed'} },
        { provide: MAT_DIALOG_DATA, useValue: {item: {
          trailer: 'string'
        }} },
      ]
    }).overrideComponent(DialogContentComponent, {

    })
    .compileComponents();
    fixture = TestBed.createComponent(DialogContentComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
  });

  it('should run #closeDialog()', async () => {
    component.closeDialog();
  });

});
