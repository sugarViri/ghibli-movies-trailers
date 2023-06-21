import { Directive, ElementRef, HostListener } from '@angular/core';
import { ImageLoadService } from '../services/image-load.service'

@Directive({
  selector: '[appImgLoad]'
})

export class ImgLoadDirective {
  constructor(private el: ElementRef, private imageLoadService: ImageLoadService) {
    imageLoadService.imageLoading(el.nativeElement);
  }

  @HostListener('load')
  onLoad() {
    this.imageLoadService.imageLoadedOrError(this.el.nativeElement);
  }

  @HostListener('error')
  onError() {
    this.imageLoadService.imageLoadedOrError(this.el.nativeElement);
  }

}
