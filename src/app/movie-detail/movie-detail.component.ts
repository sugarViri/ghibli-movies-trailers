import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FavsService } from '../services/favs.service';
import { ImageLoadService } from '../services/image-load.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];

  itemsFav: Array<any> = [];
  actualRoute: string = '';
  movieDetail: any;
  isTrailerChecked: boolean = false;
  imagesLoaded: number = 0;
  areLoaded: boolean = false;
  isLoading: boolean = true;
  scrollLength: number | undefined;
  isScrolled: boolean = false;

  constructor(
    private router: Router,
    private favDataDet: FavsService,
    private imgLoaded: ImageLoadService
  ) {

  }

  ngOnInit(): void {
    this.actualRoute = this.router.url;
    this.movieDetail = this.favDataDet.getMovie();
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }, 0);
    setTimeout(() => {
      this.isLoading = false
    }, 260)
    this.getSubscriptions();
  }

  getSubscriptions() {
    this.subscriptions.push(this.favDataDet.itemsObservable$.subscribe((items: Array<any>) => {
      this.itemsFav = items;
    }));

    this.subscriptions.push(this.imgLoaded.imagesLoading$.subscribe((item: any) => {
      this.imagesLoaded = item;
        this.checkLoaded();
    }));
  }

  checkLoaded() {
    if (this.imagesLoaded === 0) {
      return this.areLoaded = true;
    } else {
      return this.areLoaded = false;
    }
  }

  onCheckTrailer(evt: string) {
    evt === 'Visto' ? this.isTrailerChecked = true : this.isTrailerChecked = false;
  }

  toggleFav() {
    this.movieDetail.fav = !this.movieDetail.fav;
    if (!this.movieDetail.fav) {
      const idx = this.itemsFav.findIndex((favObj: any) => {
        return favObj.id === this.movieDetail.id
      });
      this.favDataDet.deleteItem(idx);
    } else {
      this.favDataDet.addItem(this.movieDetail);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: any) => subs.unsubscribe());
  }

}
