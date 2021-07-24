import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesTableComponent } from './movies-table.component';

const routes: Routes = [
  { path: '**', component: MoviesTableComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
