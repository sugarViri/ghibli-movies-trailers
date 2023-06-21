import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesListComponent } from './movies-list.component';
import { Router } from '@angular/router';
import { FavsService } from '../services/favs.service';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { serviceFavMockTest } from './movies-list.models';

const serviceFavMock = serviceFavMockTest;

const serviceRouterMock = {
  navigate() {
    return of(['/movie-detail/', 'Test'])
  }
}
const serviceFormMock = {
  group() {
    return ({ invalid: false, value: { fullScore: 1234} } as FormGroup)
  }
}

describe('MoviesListComponent', () => {
  let component: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        MoviesListComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [

        { provide: FavsService, useValue: serviceFavMock },
        { provide: Router, useValue: serviceRouterMock },
        { provide: FormBuilder, useValue: serviceFormMock },
        { provide: Renderer2, useValue: {listen: () => ({})}}
      ]
    }).overrideComponent(MoviesListComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.debugElement.componentInstance;
    component.createRanking = new FormGroup({
      fullScore: new FormControl(0, [Validators.required, component.customValidator()])
    });
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

  it('should run #updateList()', async () => {
    component.moviesList = [{id: '12'}, {id: '13'}];
    component.testFavList = [{id: '12'}, {id: '18'}];
    component.updateList();
  });

  it('should run #getView()', async () => {
    component.getView();
  });

  it('should run #showDetail()', async () => {
    component.favData.setScrollLength = () => ({});
    component.showDetail({wrongScore: true});
  });

  it('should run #showDetail()', async () => {
    component.favData.setScrollLength = () => ({});
    component.showDetail({});
  });

  it('should run #toggleFav()', async () => {
    component.testFavList = [{id: '12'}, {id: '18'}];
    component.toggleFav({fav: true, id:'12'});
    component.toggleFav({fav: false, id:'18'});
  });

  it('should run #favClass()', async () => {
    component.favClass({fav: true});
    component.favClass({fav: false});
  });

  it('should run #ngOnDestroy()', async () => {
    component.unlistener = () => ({});
    component.ngOnDestroy();
  });
  it('should run #customValidator()', async () => {
    component.customValidator();
    component.createRanking = new FormGroup({
      fullScore: new FormControl(12, [Validators.required, component.customValidator()])
    });
    component.customValidator();
  });
  it('should run #limitNumberLength()', async () => {
    component.limitNumberLength();
    component.createRanking = new FormGroup({
      fullScore: new FormControl([Validators.required, component.customValidator()])
    });
    component.limitNumberLength();
  });

  it('should run #clearScore()', async () => {
    component.testFavList = [{
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
    }]
    component.clearScore({id: '2baf70d1-42bb-4437-b551-e5fed5a87abe',wrongScore: true});
    expect(component.showWarning).toBe(false);
  });

  it('should run #addScore()', async () => {
    component.createRanking = new FormGroup({
      fullScore: new FormControl('', [Validators.required, component.customValidator()])
    });
    component.addScore(8, 0, {});
    component.createRanking = new FormGroup({
      fullScore: new FormControl(8, [Validators.required, component.customValidator()])
    });
    component.addScore(9, 0, {});
  });

});
