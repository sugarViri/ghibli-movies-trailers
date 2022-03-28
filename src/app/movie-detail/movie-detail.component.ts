import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FavsService } from '../services/favs.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription;
  items: any;
  tooltip: string = '';
  classMovieDetail = '';

  isFav: boolean = false;
  favList: Array<any> = [];

  inputScore: number | null = null;
  createRanking: FormGroup;
  numberRegEx = /^-?(0|[1-9]\d*)?$/;
  showWarning:boolean = false;
  warningMessge:string = 'Enter a valid score';

  @Input() movie: any;
  @Input() view: any;
  @Input() ranking: any;
  @Output() movieFav: EventEmitter<any> = new EventEmitter<any>();
  @Output() movieDetail: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private favData: FavsService, private fb: FormBuilder) {
    this.createRanking = this.fb.group({
      fullScore: new FormControl(this.inputScore, [Validators.required, Validators.maxLength(2), this.customValidator()])
    })
  }



  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value > 10 || control.value < 0;
      console.log('Forbidden', forbidden)
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    }
  }

  keyPressNumbers(event: any) {
    if (this.inputScore != null) {
      if (this.inputScore.toString().length >= 2) {
        debugger;
        this.inputScore = parseInt(this.inputScore.toString().slice(0, 1));
      }
    }
  }

  ngOnInit(): void {
    this.isFav = this.movie.fav;

    this.subscription = this.favData.itemsObservable$.subscribe((items: Array<any>) => {
      this.items = items;
    });
    this.classView();
    this.tooltipText();

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  classView(): string {
    if (this.view === 'isDetailView') {
      return this.classMovieDetail = 'detail';
    } else if (this.view === 'isListView') {
      return this.classMovieDetail = 'card';
    } else {
      return this.classMovieDetail = 'fav-style'
    }
  }

  toggleFav() {
    this.isFav = this.isFav ? false : true;
    this.movieFav.emit({ movie: this.movie, id: this.movie.id, fav: this.isFav });
    this.tooltipText();
  }
  favIcon(): string {
    return !this.isFav ? 'fav-icon' : 'fav-icon-fav';
  }

  favClass(): string {
    return !this.isFav ? 'fav-icon' : 'fav-icon-fav';
  }

  tooltipText(): string {
    return !this.isFav ? this.tooltip = 'Add To Favs' : this.tooltip = 'Remove Fav';
  }

  showDetail() {
    this.router.navigate(['/movie-detail/', this.movie.id]);
    this.movieDetail.emit(this.movie);
  }

  clearScore() {
    this.inputScore=null
    this.showWarning = false
  }

  addScore() {
    console.log(this.createRanking.value);
    if (this.createRanking.invalid) {
      this.showWarning = true;
      this.inputScore = null;
      console.log('Invalid')
    } else {
      console.log('Valid')
  /*     this.favData.addItemScore(this.movie, this.inputScore); */
      this.showWarning = false;
    }


  }

}
