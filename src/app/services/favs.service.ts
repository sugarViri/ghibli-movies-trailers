import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavsService {
  private items: Array<any> = []
  private itemsSubject = new Subject<any>();
  public itemsObservable$ = this.itemsSubject.asObservable();

  constructor() { }

  addItem(item:any) {
    this.items.push(item);
    this.itemsSubject.next(this.items);
  }

  deleteItem(index:number) {
    this.items.splice(index, 1);
    this.itemsSubject.next(this.items);
  }

 /*  addScore(item:any) {
    this.items.push(item);
    this.itemsSubject.next(this.items);
  } */
}
