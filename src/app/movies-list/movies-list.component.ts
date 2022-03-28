import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {
  movieFavList: Array<any> = [];
  movieActualList:Array<any> = [];

  @Input() movies:any;
  @Input() view:any;
  @Output() favList:EventEmitter<any> = new EventEmitter<any>();
  @Output() movieDetail:EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onDetail(movie:any) {
    this.movieDetail.emit(movie);
  }

  onFavMovie(event: any) {
    this.favList.emit(event);
  }

}
