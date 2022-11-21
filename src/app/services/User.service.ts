import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject, tap } from 'rxjs';
import { LoginModel } from "src/app/models/login.model";
import { posts } from "../models/posts.model";
import { Tcategoria } from "../models/Tcategoria.model";
import { Tchat } from "../models/Tchat.model";
import { Tcomentarios } from "../models/Tcomentarios.model";
import { TconteoLikes } from "../models/TconteoLikes.model";
import { Teditarperfil } from "../models/Teditarperfil.model";
import { Tpost } from "../models/Tpost.model";
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

    obtenerPostsCat(data:any):Observable<Tposts>{
      return this.client.post<Tposts>(
        this.urlApi + '?u=postCategoria',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
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

    ingresarComentario(data:any):Observable<Tcomentarios>{
      return this.client.post<Tcomentarios>(
        this.urlApi + "?u=comentarPost",
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    eliminarComentario(data:any):Observable<Tcomentarios>{
      return this.client.post<Tcomentarios>(
        this.urlApi + "?u=eliminarComentario",
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    obtenerComentarios(data:any):Observable<Tcomentarios>{
      return this.client.post<Tcomentarios>(
        this.urlApi + '?u=verComentarios',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    guardarPost(data:any):Observable<Tpost>{
      return this.client.post<Tpost>(
        this.urlApi + "?u=guardarPost",
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    verPost(data:any):Observable<Tpost>{
      return this.client.post<Tpost>(
        this.urlApi + "?u=verPost",
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
      console.log(data);
      return this.client.post<Teditarperfil>(
        this.urlApi + '?u=modificarUsuario',
        JSON.stringify(data),
      )
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

    cambiarcontraseña(data:any):Observable<any>{
      console.log(data)
      return this.client.post<any>(
        this.urlApi + '?u=cambiarContra',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

  
  }


