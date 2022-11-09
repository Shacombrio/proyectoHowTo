import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject, tap } from 'rxjs';
import { LoginModel } from "src/app/models/login.model";
import { posts } from "../models/posts.model";
import { Tcategoria } from "../models/Tcategoria.model";
import { Tposts } from "../models/Tposts.model";

/* Modelos */
import { TUsuario } from "../models/TUsuario.model";

@Injectable( {

    providedIn: 'root',

})

export class UsrService {

    urlApi: string = 'http://localhost/api/';
    private _refresh$ = new Subject <void> ();
    get refresh() {
        return this._refresh$;
    }

    constructor( private client: HttpClient ) {}

    login(data: LoginModel): Observable<TUsuario> {

      return this.client.post<TUsuario>(
        this.urlApi + '?u=Login',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }
    saveToken(data: any) {
      localStorage.setItem('token', data);
      const helper = new JwtHelperService();
      localStorage.setItem('data', JSON.stringify(helper.decodeToken(data)));
    }

    obtenerPosts():Observable<Tposts>{
      return this.client.post<Tposts>(
        this.urlApi + '?u=mostrarPosts',
        ''
      )
    }

    ingresarPosts(data:any):Observable<Tposts>{
      return this.client.post<Tposts>(
        this.urlApi + '?u=ingresarPost',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    mostrarCat():Observable<Tcategoria>{
      return this.client.post<Tcategoria>(
        this.urlApi + '?u=mostrarCategria',
        ''
      )
    }

  }

