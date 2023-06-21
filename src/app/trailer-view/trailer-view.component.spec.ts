import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailerViewComponent } from './trailer-view.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { FavsService } from '../services/favs.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { MatDialogModule, MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

const moviesTrailerMock = {
  getVideoFrame() {
    return of("https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe")
  }
}

describe('TrailerViewComponent', () => {
  let component: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailerViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: MoviesService, useValue: moviesTrailerMock },
        { provide: FavsService, useValue: { checkTrailer: () => ({})} },
        { provide: MatDialogRef, useValue: { afterClosed: () => of({})} },
        { provide: MatDialog, useValue: { open: () => ({
          afterClosed: () => of({result: 'result'})
        }) }}

      ]
    }).overrideComponent(TrailerViewComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TrailerViewComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
  });

  it('should run #openDialog()', async () => {
    component.openDialog({id: 'item'});
  });
  it('should run #viewTrailer()', async () => {
    component.viewTrailer();
  });
  it('should run #closeTrailer()', async () => {
    component.closeTrailer();
  });
});
