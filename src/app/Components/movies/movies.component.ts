import { TMDBService } from './../../Services/tmdb.service';
import { Imovies } from './../../Models/imovies';
import { Component, OnInit } from '@angular/core';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies : Imovies[] = []
  public result = ""


  constructor( private _api : TMDBService, private _http: HttpClient) { }

  ngOnInit(): void {
    this._api.GetMoviesDetails().subscribe(
      (data) => this.movies = data,
      (err) => console.error(err),
      () => console.log('Fin de l\'observation')
    )
    // this._api.GetMoviesDetails().pipe(
    //   timeout(2000),
    //   catchError(e => {
    //      do something on a timeout
    //     return of(null);
    //   }))
  };

  check(filmChoisi) {
    let filmNonChoisi = this.movies.find(m=>m.tconst != filmChoisi.tconst)
    if(filmNonChoisi.startYear < filmChoisi.startYear){this.result="Lose"}
    else{this.result="Win"}
    this._http.post("http://localhost:2403/results/", {
      movie_id1 : filmChoisi.tconst,
      movie_id2 : filmNonChoisi.tconst,
      result : this.result
    }).subscribe()
  }

  rejouer(){
    this.result = ""
    this.ngOnInit()
  }


}
