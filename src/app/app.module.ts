import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { APP_BASE_HREF } from '@angular/common';
import { MoviesService } from './services/movies.service';
import { FavsService } from './services/favs.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LimitNumberDirective } from './directives/limit-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieDetailComponent,
    LimitNumberDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ MoviesService, FavsService, { provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
