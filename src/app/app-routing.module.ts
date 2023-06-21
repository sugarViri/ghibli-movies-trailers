import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies-list', pathMatch: 'full' },
  { path: 'movies-list', component: MoviesListComponent },
  { path: 'movies-favs', component: MoviesListComponent },
  { path: 'movies-list/movie-detail/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: 'movies-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled'/* ,
    scrollOffset: [0, 0],
    anchorScrolling: "enabled", */
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
