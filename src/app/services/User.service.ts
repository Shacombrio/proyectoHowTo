import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { LoginModel } from "src/app/models/login.model";
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
import { Usuario } from "../models/usuario.model";

@Injectable( {

    providedIn: 'root',

})

export class UsrService {
  @Output() admin : EventEmitter<any> = new EventEmitter<any>();

  getUserLoggedInStatus(): Observable<any> {
    //console.log('returning' + this.loggedInUser);
      return this.admin.asObservable();
    }

    
  profile: Subject<any> = new BehaviorSubject<any>({});
  emit(value: any) {
    this.profile.next(value);
  }   

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
      const x = JSON.parse(JSON.stringify(helper.decodeToken(data)));
      
      //localStorage.setItem('tipoUsuario',v.TipoUsuario);
      localStorage.setItem('tipoUser', x.data.tipoUsuario);
      this.admin.emit(true);
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

    obtenerPostsUnico(data:any):Observable<Tposts>{
      return this.client.post<Tposts>(
        this.urlApi + '?u=verPostEditar',
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

    ingresarCat(data:any):Observable<Tcategoria>{
      return this.client.post<Tcategoria>(
        this.urlApi + '?u=RegistrarCategoria',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    EliminarCat(data:any):Observable<Tcategoria>{
      return this.client.post<Tcategoria>(
        this.urlApi + '?u=EliminarCategoria',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    modificarPosts(data:any):Observable<Tposts>{
      return this.client.post<Tposts>(
        this.urlApi + '?u=modificarPost',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    modificarCategoria(data:any):Observable<Tcategoria>{
      return this.client.post<Tcategoria>(
        this.urlApi + '?u=modificarCategoria',
        JSON.stringify(data),
      
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    modificarPostsPagina(data:any):Observable<Tposts>{
      return this.client.post<Tposts>(
        this.urlApi + '?u=modificarPostPagina',
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

    daraltausr(data:any){
      return this.client.post(
        this.urlApi+'?u=DarAltaUsuario',JSON.stringify(data)
      ).pipe(
        tap(()=>{
          this.refresh.next();
        })
      );
    }
    darbajausr(data:any){
      return this.client.post(
        this.urlApi+'?u=eliminarUsuario',JSON.stringify(data)
      ).pipe(
        tap(()=>{
          this.refresh.next();
        })
      );
    }

    islogin(){
      return localStorage.getItem('token') != null;
    }

    isadmin(){
      return localStorage.getItem('data')!=null;
    }



  }


