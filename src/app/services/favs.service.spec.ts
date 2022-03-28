import { from, Observable, of as observableOf, of, pipe, throwError } from 'rxjs';
import { FavsService } from './favs.service';

describe('FavsService', () => {
  let service: any;

  beforeEach(() => {
    service = new FavsService(
    );
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #addItem()', async () => {
    service.addItem({});
  });

  it('should run #deleteItem()', async () => {
    service.deleteItem(0);
  });
});
