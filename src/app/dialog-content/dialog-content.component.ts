import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})


export class DialogContentComponent implements OnInit {

  safeSrc: any;
  selectedSource: string = '';
  showTrailer:boolean = false;
  isLoaded:boolean = false;
  updatedMovies: Array<any> = [];

  @Output() checkTrailer:EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private moviesInfo: MoviesService,
    public dialog: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }


  ngOnInit(): void {
    this.selectedSource = this.data.item.trailer;
    this.safeSrc = this.moviesInfo.getVideoFrame(this.selectedSource);
    this.isLoaded = true;
  }

  closeDialog() {
    this.showTrailer = false;
    this.dialog.close('Closed!!!');
    this.checkTrailer.emit('No Visto');
  }
}

export interface DialogData {
  item: {
    trailer: string
  }
}
