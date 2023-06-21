import { of as observableOf, of } from 'rxjs';
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
  const sanit = {
    bypassSecurityTrustResourceUrl: () => {
      return of({
        url: 'https://www.youtube.com/embed/92a7Hj0ijLs'
      })
    }
  }

  beforeEach(() => {
    service = new MoviesService(
      http as any,
      sanit as any
    );
  });

  it('should run #movies()', async () => {
    service.getMovies().subscribe();
    service.http.get = () => {
      return of({
        url: {
          base: 'https://ghibliapi.herokuapp.com/films'
        },

      });
    }
    service.getMovies().subscribe();
  });

  it('should run #getVideoFrame()', async () => {
    service.getVideoFrame('https://www.youtube.com/watch?v=92a7Hj0ijLs').subscribe();
    service.sanitizier.bypassSecurityTrustResourceUrl = () => {
      return of({
        url: {
          base: 'https://www.youtube.com/watch?v=92a7Hj0ijLs'
        },

      });
    }
    service.getVideoFrame('https://www.youtube.com/watch?v=92a7Hj0ijLs').subscribe();
    service.getVideoFrame('null').subscribe();
  });

});
