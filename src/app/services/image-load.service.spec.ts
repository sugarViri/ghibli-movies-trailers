import { ImageLoadService } from './image-load.service';
import { from, Observable, of as observableOf, of, pipe, throwError } from 'rxjs';

describe('ImageLoadService', () => {
  let service: any;

  beforeEach(() => {
    service = new ImageLoadService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run imageLoading', () => {
    service.imageLoading({});
  });

  it('should run imageLoadedOrError', () => {
    service.imageLoadedOrError({});
  });

  it('should run getLoaded', () => {
    service.getLoaded();
  });

  it('should run getImgLoaded', () => {
    service.getImgLoaded();
  });
});
