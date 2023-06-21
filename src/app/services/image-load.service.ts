import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageLoadService {
  private _imagesLoading = new Subject<number>();
  private images: Map<HTMLElement, boolean> = new Map();
  private imagesLoading = 0;

  imagesLoading$ = this._imagesLoading.asObservable();

  constructor() { }

  imageLoading(img: HTMLElement) {
    if (!this.images.has(img) || this.images.get(img)) {
      this.images.set(img, false);
      this.imagesLoading++;
      this._imagesLoading.next(this.imagesLoading);
    }
  }

  imageLoadedOrError(img: HTMLElement) {
    if (this.images.has(img) && !this.images.get(img)) {
      this.images.set(img, true);
      this.imagesLoading--;
      this._imagesLoading.next(this.imagesLoading);
    }
  }

  getLoaded(): number {
    return this.imagesLoading;
  }

  getImgLoaded() {
    return this.images;
  }
}
