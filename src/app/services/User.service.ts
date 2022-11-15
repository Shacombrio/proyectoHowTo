import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject, tap } from 'rxjs';
import { LoginModel } from "src/app/models/login.model";
import { posts } from "../models/posts.model";
import { Tcategoria } from "../models/Tcategoria.model";
import { Tchat } from "../models/Tchat.model";
import { TconteoLikes } from "../models/TconteoLikes.model";
import { Teditarperfil } from "../models/Teditarperfil.model";
import { Tposts } from "../models/Tposts.model";
import { Treacciones } from "../models/Treacciones.model";
import { TregistroUsuario } from "../models/TregistroUsuario.model";


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

    ingresarReaccion(data:any):Observable<Treacciones>{
      return this.client.post<Treacciones>(
        this.urlApi + '?u=Likes',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    conteoLikes(data:any):Observable<TconteoLikes>{
      return this.client.post<TconteoLikes>(
        this.urlApi + '?u=conteoLikes',
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

    obtenerUser():Observable<TUsuario>{
      return this.client.post<TUsuario>(
        this.urlApi + "?u=obtenerUsuarios",
        ''
      )
    }

    obtenerChat(data:any):Observable<Tchat>{
      return this.client.post<Tchat>(
        this.urlApi + "?u=obtenerChat",
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    ingresarChat(data:any):Observable<Tchat>{
      return this.client.post<Tchat>(
        this.urlApi + "?u=ingresarChat",
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    registroUsuario(data:any):Observable<TregistroUsuario>{
      console.log(data)
      return this.client.post<TregistroUsuario>(
        this.urlApi + '?u=ingresarUsuario',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    editarperfil(data:any):Observable<Teditarperfil>{
      console.log(data)
      return this.client.post<Teditarperfil>(
        this.urlApi + '?u=modificarUsuario',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    bajaUsuario(data:any):Observable<any>{
      console.log(data)
      return this.client.post<any>(
        this.urlApi + '?u=eliminarUsuario',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

  }


