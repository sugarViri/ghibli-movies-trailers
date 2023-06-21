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

  it('should run #storeMovies()', async () => {
    service.storeMovies([{}]);
  });

  it('should run #getMovies()', async () => {
    service.getMovies();
  });

  it('should run #getFavItems()', async () => {
    service.getFavItems();
  });

  it('should run #selectMovie()', async () => {
    service.selectMovie({});
  });

  it('should run #getMovie()', async () => {
    service.getMovie();
  });
  it('should run #selectView()', async () => {
    service.selectView('view');
  });
  it('should run #getSelectedView()', async () => {
    service.getSelectedView();
  });
  it('should run #selectFav()', async () => {
    service.selectFav();
  });
  it('should run #selectHome()', async () => {
    service.selectHome();
  });

  it('should run #orderFavourites()', async () => {
    service.items = [{score:1}, {score:0}, {}, {score:7}];
    service.orderFavourites(7, 1);

  });

  it('should run #checkTrailer()', async () => {
    service.itemsMovies = [{id:'Test'}, {id:'0'}, {}, {id:'7'}];
    service.checkTrailer({id:'Test'});

  });
});
