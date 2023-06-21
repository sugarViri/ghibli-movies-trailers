import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImgLoadDirective } from './img-load.directive';
import { ImageLoadService } from '../services/image-load.service';
import { ElementRef } from '@angular/core';

@Component({
  template: `
  <img appImageLoad [src]="movieSrc">
  `
})
class DirectiveTestComponent {
  movieSrc: any;
}

describe('ImgLoadDirective', () => {
  let fixture: ComponentFixture<DirectiveTestComponent>;
  let component: DirectiveTestComponent;
  let directiveEl;
  let directive: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ImgLoadDirective, DirectiveTestComponent],
      providers: [
        { provide: ElementRef, useValue: { nativeElement: {} } },
        {
          provide: ImageLoadService, useValue: {
            imageLoading() {
              return ({});
            },
            imageLoadedOrError() {
              return ({});
            },
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it("should run a directive", async () => {
    expect(component).toBeTruthy();
  });

})
