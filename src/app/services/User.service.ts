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
import { TmodLikes } from "../models/TmodLikes.model";
import { Tpost } from "../models/Tpost.model";
import { Tposts } from "../models/Tposts.model";
import { Treacciones } from "../models/Treacciones.model";
import { TregistroUsuario } from "../models/TregistroUsuario.model";
import { Tfav } from "../models/Tfav.model";
import { Teliminarfav } from "../models/Teliminarfav.model"


/* Modelos */
import { TUsuario } from "../models/TUsuario.model";
import { Tmostrarfav } from "../models/Tmostrarfav.model";
import { Tmisposts } from "../models/Tmisposts.model";
import { TmostrarmisCatposts } from "../models/TmostrarmisCatposts.model";
import { TeliminarReac } from "../models/TeliminarReaccion.model";


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

    obtenerPostsAdmin():Observable<Tposts>{
      return this.client.post<Tposts>(
        this.urlApi + '?u=mostrarPostsAdmin',
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

    Busqueda(data:any):Observable<Tposts>{
      return this.client.post<Tposts>(
        this.urlApi + '?u=Buscar',
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

      actLikes(data:any):Observable<TmodLikes>{
      return this.client.post<TmodLikes>(
        this.urlApi + '?u=actLikes',
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

    validarReaccion(data:any):Observable<Treacciones>{
      return this.client.post<Treacciones>(
        this.urlApi + '?u=verificarReaccion',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    consulReaccion(data:any):Observable<Treacciones>{
      return this.client.post<Treacciones>(
        this.urlApi + '?u=consulReaccion',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    eliminarReaccion(data:any):Observable<TeliminarReac>{
      return this.client.post<TeliminarReac>(
        this.urlApi + '?u=eliminarReaccion',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    }

    ingresarfav(data:any):Observable<Tfav>{
      return this.client.post<Tfav>(
        this.urlApi + '?u=registrarFavorito',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    
    }

    mostrarfav(data:any):Observable<Tmostrarfav>{
      return this.client.post<Tmostrarfav>(
        this.urlApi + '?u=MostrarFav',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      );
  
    }

    mostrarCatFav(data:any):Observable<Tmostrarfav>{
      return this.client.post<Tmostrarfav>(
        this.urlApi + '?u=MostrarFav',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      );
  
    }

    eliminarfav(data:any):Observable<Teliminarfav>{
      return this.client.post<Teliminarfav>(
        this.urlApi + '?u=eliminarFav',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      ).pipe(
        tap(() => {
          this.refresh.next();
        })
      );
    
    }

    mostrarmisposts(data:any):Observable<Tmisposts>{
      return this.client.post<Tmisposts>(
        this.urlApi + '?u=misPost',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      );
  
    }

    mostrarmisCatposts(data:any):Observable<TmostrarmisCatposts>{
      return this.client.post<TmostrarmisCatposts>(
        this.urlApi + '?u=MostrarmisCatposts',
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
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

    buscarUser(data:any):Observable<TUsuario>{
      return this.client.post<TUsuario>(
        this.urlApi + '?u=buscarUser',
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

    mostrarCatAdmin():Observable<Tcategoria>{
      return this.client.post<Tcategoria>(
        this.urlApi + '?u=mostrarCategriaAdmin',
        ''
      )
    }

    obtenerUser():Observable<TUsuario>{
      return this.client.post<TUsuario>(
        this.urlApi + "?u=obtenerUsuariosAdmin",
        ''
      )
    }

    obtenerUserUser():Observable<TUsuario>{
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

    daraltaPosts(data:any){
      return this.client.post(
        this.urlApi+'?u=darAltaPost',JSON.stringify(data)
      ).pipe(
        tap(()=>{
          this.refresh.next();
        })
      );
    }
    darbajaPosts(data:any){
      return this.client.post(
        this.urlApi+'?u=eliminarPost',JSON.stringify(data)
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

    sendcorreoban(data:any){
      return this.client.post(this.urlApi+'?u=EnviarCorreoBan',JSON.stringify(data));
    }

    sendcorreodesban(data:any){
      return this.client.post(this.urlApi+'?u=EnviarCorreodesBan',JSON.stringify(data));
    }


  }


