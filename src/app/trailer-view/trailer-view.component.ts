import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { FavsService } from '../services/favs.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';


@Component({
  selector: 'trailer-view',
  templateUrl: './trailer-view.component.html',
  styleUrls: ['./trailer-view.component.css']
})
export class TrailerViewComponent implements OnInit {

  @Output() checkTrailer:EventEmitter<any> = new EventEmitter<any>();
  @Input() movie: any;

  safeSrc: any;
  selectedSource: string = 'https://www.youtube.com/watch?v=92a7Hj0ijLs';
  showTrailer:boolean = false;
  isLoaded:boolean = false;
  updatedMovies: Array<any> = [];
  dialogRef!: MatDialogRef<DialogContentComponent>;

  constructor(
    private moviesInfo: MoviesService,
    private favService: FavsService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.safeSrc = this.moviesInfo.getVideoFrame(this.selectedSource);
    this.isLoaded = true;
  }

  openDialog(item:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { item };
    this.dialogRef = this.dialog.open(DialogContentComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'Closed!!!') {
        this.checkTrailer.emit('No Visto');
      }
    });

    this.favService.checkTrailer(item);
    this.viewTrailer(item)
  }

  viewTrailer(item:any) {
    this.showTrailer = true;
    this.checkTrailer.emit('Visto');
    this.favService.checkTrailer(item);

  }

  closeTrailer() {
    this.showTrailer = false;
    this.checkTrailer.emit('No Visto');
  }
}
