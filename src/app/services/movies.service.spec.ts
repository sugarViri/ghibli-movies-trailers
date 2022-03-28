import { from, Observable, of as observableOf, of, pipe, throwError } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: any;
  const http = {
    get: () => {
      return of({
        body: [
          {
            base: 'https://ghibliapi.herokuapp.com/films',
            id: 'Test'
          }
        ]

      });
    }
  };

  beforeEach(() => {
    service = new MoviesService(
      http as any
    );
  });

  it('should run #movies()', async () => {
    service.movies().subscribe();
    service.http.get = () => {
      return of({
        url: {
          base: 'https://ghibliapi.herokuapp.com/films'
        },

      });
    }
    service.movies().subscribe();
  });

  it('should run #movies2()', async () => {
    service.movies2();
    service.http.get = () => {
      return of({
        body: {
          base: 'https://ghibliapi.herokuapp.com/films'
        },

      });
    }
    service.movies2();
  });

});
