import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { APP_BASE_HREF } from '@angular/common';
import { MoviesService } from './services/movies.service';
import { FavsService } from './services/favs.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrailerViewComponent } from './trailer-view/trailer-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { ImgLoadDirective } from './directives/img-load.directive';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieDetailComponent,
    TrailerViewComponent,
    DialogContentComponent,
    ImgLoadDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [ MoviesService, FavsService, { provide: APP_BASE_HREF, useValue: '/' } ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
