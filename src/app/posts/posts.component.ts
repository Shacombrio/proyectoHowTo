import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CrearPostComponent } from '../crear-post/crear-post.component';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { posts } from '../models/posts.model';
import { reaccion } from '../models/reacciones.model';
import { contLikes } from '../models/conteoLikes.model';
import {FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { Posts } from './posts.model';
import { VariablesService } from '../services/variables.service';
import { Router } from '@angular/router';
import { categoria } from '../models/cotegoria.model';





@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
  
})
export class PostsComponent implements OnInit {
  toastTrigger!:any;
  cond:any;
  nl:any;
  toastLiveExample!:any;
  bootstrap!:any;
  pibote:any = 1;
  ncat!:string;
  idcat!:string;
  idReaccion:any;
  categoria!:categoria[];
  sub!: Subscription;
  post!: posts[];
  val!:any[];
  tam:number=75;
  masMenos:string="Leer mas";
  //count!:contLikes;
  reaccion!:reaccion[];
  sumaLikes!: number;
  dato!:number;
  idpost!:number;
  color:string = 'rgb(96, 217, 52)';
  idP:any="";
  idUser!:any;
  public isClicked: boolean = false;
  //public tonoLike: string = "";
  @ViewChild('modal') modal !: CrearPostComponent;
  constructor(private userService: UsrService, private servVar:VariablesService,private router:Router) { 

  }

  


  view(){
    this.tam = 200;
  }

  leerMas(){
    if(this.masMenos=="Leer mas"){
      this.tam = 200;  
      this.masMenos="Leer menos";
    }else{
      this.tam=75;
      this.masMenos="Leer mas";
    }
  }

  positive(idpost:any){
    this.idP = idpost;
    //this.validarReac(idpost);
    this.userService.ingresarReaccion(
    { idUsuario:JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
      Reaccion: 1,
      idPost: idpost
    }
      
    ).subscribe( (x) =>{
     console.log(JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,idpost)
     this.conteoLikes(idpost,1);
     //this.validarReac();
    } )

    
 
  }
  validarReac(idpost:any,re:any){
    this.userService.validarReaccion(
      {
        idPost:idpost,
        idUsuario: JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        Reaccion:re
      }
    ).subscribe((x)=>
    {
      //x.data[0].idReaccion=1;
      console.log(x.data);
      if (x.data[0] == null){

        console.log("hola");
        this.cond = idpost;
        if(re==1){
          this.positive(idpost);
        }else{
          this.negative(idpost);
        }
      }else{
        
        console.log("adios");
        if(re==1){
          this.eliminarReac(idpost,1);
        }else{
          this.eliminarReac(idpost,2);
        }
        //console.log(x.data[0].idReaccion);
      }
    }
    )
  }

  eliminarReac(idpost:any,reac:any){
    this.userService.eliminarReaccion(
      {
        idPost: idpost,
        idUsuario : JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        Reaccion: reac
      }
    ).subscribe((x)=>
    {
      this.conteoLikes(idpost,reac);
    }
    )
  }
  getColorCard(d: any,id:any) {

  }
  verid(idpost:any): void{
    console.log(idpost);
    console.log("hola");
    this.servVar.disparador.emit(idpost);
    this.router.navigate(['/verPost']); 
  }
  negative(idpost:any){
    this.userService.ingresarReaccion(
      { idUsuario:JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        Reaccion: 2,
        idPost: idpost
      }
        
      ).subscribe( (x) =>{
        this.conteoLikes(idpost,2);
      } )
  }

  obtenerfav(idpost:any){
    this.userService.ingresarfav(
      { 
        idUsuario:JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        idPosts: idpost
      }
    ).subscribe( (x) =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Añadido a favoritos',
        showConfirmButton: false,
        timer: 1500
      })
    } )
    
  }

  ngOnInit(): void {
    
    this.obtenerposts();
    this.obtenerCategoria();

    this.sub = this.userService.refresh.subscribe(() => {
      this.obtenerposts();
      
    })
    this.consulReaccion();
  }

consulReaccion(){
  this.userService.consulReaccion({
    idUsuario: JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
    Reaccion: 1
  }).subscribe((x)=>
  {
    console.log(x.data);
    this.val = x.data;
    console.log(this.val);
  }
  )
  for(let i = 0 ; i < this.post.length ; i++){
    if (this.post[i] = this.val[i]){
      console.log("si")
    }
}
}

obtenerposts(){
  this.idUser = JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario;
  if (this.pibote==1){
    
  this.userService.obtenerPosts().subscribe((x)=>
  {

  this.post = x.data;
  //console.log(this.post);
  }
  )
  }else{
    this.userService.obtenerPostsCat(
      {
        idCategoria: this.idcat
      }
    ).subscribe((x)=>
    {
  
    this.post = x.data;
    console.log(this.post);
  
    }
    )
  }
}

selecCat(nombre:any,id:any){
  if(id==0){
    this.pibote = 1;
    this.obtenerposts();
    this.ncat = "";
  }else{
  this.ncat=nombre;
  this.idcat=id;
  this.pibote = 2;
  this.obtenerposts();
  }
}

obtenerCategoria(){
  this.userService.mostrarCat().subscribe((x)=>
  {
    this.categoria=x.data;
    console.log(this.categoria);
  }
  )
}

conteoLikes(idp:any,R:any){
  this.userService.conteoLikes(
    {
      idPost:idp,
      Reaccion: R
    }
  ).subscribe((x)=>
  {
    
    console.log(x.data);
    this.nl = x.data;
    console.log (this.nl[0].conteo);
   this.nl = this.nl[0].conteo;
   this.updatelikes(this.nl,idp,R);
  }
  )
}
updatelikes(num:any,idp:any,R:any){
  console.log(num);
  this.userService.actLikes(
    {
      idPosts:idp,
      Reaccion: R,
      likes:num
    }
  ).subscribe((x)=>
  {
    console.log("bien");
  }
  )
}
grabarLocalStorage(idP:any){
  let id:any = idP;
  localStorage.setItem("idPost",id);
  this.router.navigate(['/verPost']); 
}

grabarLocalStorage2(idP:any){
  let id:any = idP;
  localStorage.setItem("idPost",id);
  this.router.navigate(['/editarPost']); 
}




}
