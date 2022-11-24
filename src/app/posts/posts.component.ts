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
  toastLiveExample!:any;
  bootstrap!:any;
  pibote:any = 1;
  ncat!:string;
  idcat!:string;
  categoria!:categoria[];
  sub!: Subscription;
  post!: posts[];
  tam:number=75;
  masMenos:string="Leer mas";
  count!:contLikes;
  reaccion!:reaccion[];
  sumaLikes!: number;
  dato!:number;
  idpost!:number;
  color!:string;
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
    var colorlike = document.getElementById(idpost);
    //colorlike?.style.backgroundColor = 'rgb(0, 249, 0)';
    colorlike!.style.backgroundColor='rgb(0, 249, 0)';
    this.userService.ingresarReaccion(
    { idUsuario:JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
      Reaccion: 1,
      idPost: idpost
    }
      
    ).subscribe( (x) =>{
     console.log(JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,idpost)
    } )

    
 
  }

  getColorCard(d: any,id:any) {
    let color: string;
    if (d = this.idP){
      return color = '#008000';
    }

    return 0;
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
 
      } )
  }

  ngOnInit(): void {
 
    
    this.obtenerposts();
    this.obtenerCategoria();
    this.sub = this.userService.refresh.subscribe(() => {
      this.obtenerposts();
      
    })
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
