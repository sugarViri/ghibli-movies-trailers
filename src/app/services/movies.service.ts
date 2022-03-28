import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  url = 'https://ghibliapi.herokuapp.com/films'

  constructor(private http: HttpClient) { }

  movies(): Observable<any> {
    return this.http.get(this.url, { observe: 'response' }).pipe(map((data: any) => {
      if (data.body) {
        return data.body.map((dt:any) => {
          return {
            id: dt.id,
            fav: false,
            movie: dt
          }
        })
      } else {
        return null;
      }


    }
    ));

  }

  movies2(): any {
    return this.http.get(this.url, { observe: 'response' }).subscribe((data: any) => {
      if (data.body) {
        return data.body
      } else {
        return null;
      }

    }
    );

  }
}
