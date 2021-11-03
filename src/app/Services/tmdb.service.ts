import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imovies } from '../Models/imovies';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {

  private _url: string = "http://localhost:2403"

  constructor(private _http: HttpClient) { }

  public GetMoviesDetails() : Observable<Imovies[]> {
    return this._http.get<Imovies[]>(`${this._url}/movies`)
  }

  public postUser(user:any) : Observable<number[]>{
    return this._http.post<number[]>(`${this._url}/users/`, user)
  }
}
