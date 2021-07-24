import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {BasicService} from "./basic.service";
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {Movie} from "../common/types";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.scss']
})
export class MoviesTableComponent {
  displayedColumns: string[] = ['id', 'name', 'genre1', 'genre2', 'year'];
  data: Movie[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSize = [10, 30, 50, 100];
  private filter: string;
  timeout;

  constructor(private service: BasicService) {}

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.findMovies(
            this.paginator.pageSize,
            this.paginator.pageIndex * this.paginator.pageSize,
            this.filter
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map(res => {
          console.log(res);
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          this.resultsLength = res.size;
          return res.data;
        })
      ).subscribe(data => this.data = data);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue.trim().toLowerCase();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      if (this.paginator) {
        // refreshing
        this.paginator.page.emit();
      }
    }, 1000);
  }
}
