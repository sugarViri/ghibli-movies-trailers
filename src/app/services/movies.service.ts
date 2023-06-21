import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";


@Pipe({
  name: 'safeUrl'
})

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  _jsonURL = 'assets/data.json';
  url = 'https://ghibliapi.herokuapp.com/films';
  urlUpdate = 'https://pokeapi.co/api/v2/pokemon';
  safeSrc: any;
  trailersList: Array<string> = [
    'https://www.youtube.com/watch?v=8ykEy-yPBFc',
    'https://www.youtube.com/watch?v=4vPeTSRd580',
    'https://www.youtube.com/watch?v=92a7Hj0ijLs',
    'https://www.youtube.com/watch?v=4bG17OYs-GA',
    'https://www.youtube.com/watch?v=09WwVmXh3C8',
    'https://www.youtube.com/watch?v=awEC-aLDzjs',
    'https://www.youtube.com/watch?v=_7cowIHjCD4',
    'https://www.youtube.com/watch?v=0pVkiod6V0U',
    'https://www.youtube.com/watch?v=4OiMOHRDs14',
    'https://www.youtube.com/watch?v=1C9ujuCPlnY',
    'https://www.youtube.com/watch?v=ByXuk9QqQkk',
    'https://www.youtube.com/watch?v=Gp-H_YOcYTM',
    'https://www.youtube.com/watch?v=iwROgK94zcM',
    'https://www.youtube.com/watch?v=8hxYx3Jq3kI',
    'https://www.youtube.com/watch?v=89LbtkHG0c4',
    'https://www.youtube.com/watch?v=u8gCNCjCO2w',
    'https://www.youtube.com/watch?v=k-vfzhfq5JA',
    'https://www.youtube.com/watch?v=2QFBZgAZx7g',
    'https://www.youtube.com/watch?v=W71mtorCZDw',
    'https://www.youtube.com/watch?v=jjmrxqcQdYg',
    'https://www.youtube.com/watch?v=Sw7BggqBpTk',
    'https://www.youtube.com/watch?v=Lk5YWIbwzRE'
  ]

  constructor(private http: HttpClient, private sanitizier: DomSanitizer) {
    this.getJSON().subscribe(data => {
      console.log(data);
     });
   }


  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL, { observe: 'response' }).pipe(map((data: any) => {
      if (data.body) {
        return data.body.films.map((dt: any, index: number) => {
          return {
            id: dt.id,
            fav: false,
            checked: false,
            movie: dt,
            trailer: this.trailersList[index]
          }
        })
      } else {
        return null;
      }
      }
    ));
  }

  getMovies(): Observable<any> {
    return this.http.get(this.url, { observe: 'response' }).pipe(map((data: any) => {
      if (data.body) {
        return data.body.map((dt: any, index: number) => {
          return {
            id: dt.id,
            fav: false,
            checked: false,
            movie: dt,
            trailer: this.trailersList[index]
          }
        })
      } else {
        return null;
      }
    }
    ));
  }

  getPokemons(): Observable<any> {
    return this.http.get(this.urlUpdate, { observe: 'response' }).pipe(map((data: any) => {
      if (data.body) {
        return data.body.map((dt: any, index: number) => {
          return {
            id: dt.id,
            fav: false,
            checked: false,
            movie: dt,
            trailer: this.trailersList[index]
          }
        })
      } else {
        return null;
      }
    }
    ));
  }

  getVideoFrame(url: string) {
    var video, results;
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];
    return this.sanitizier.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

}
