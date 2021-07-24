import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../common/types';

const API_URL = '/api/v1';

@Injectable({
    providedIn: 'root'
})
export class BasicService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }
    findMovies(size, from, filter): Observable<{data: Movie[], size: number}>{
      if (from < 0) {
        return new Observable<{data: Movie[]; size: number}>(s => {s.next({size: 0, data: []})});
      }
      let years = [];
      let genres = [];
      let strict = 'false';
      if (filter) {
        filter.split(';').forEach(f => {
          if (!isNaN(f) && Number(f) > 1800 && Number(f) < 2100) {
            years.push(Number(f.trim()));
          } else {
            if (f.trim() === 'strict') {
              strict = 'true';
            } else {
              genres.push(f.trim());
            }
          }
        });
      }
      return this.http.get<{data: Movie[], size: number}>(
        API_URL + '/movies', {...this.httpOptions, params: {size, from, years, genres, strict}});
    }

}
