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

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
  
})
export class PostsComponent implements OnInit {


  sub!: Subscription;
  post!: posts[];
  tam:number=75;
  masMenos:string="Leer mas";
  count!:contLikes;
  reaccion!:reaccion[];
  sumaLikes!: number;
  dato!:number;
  idpost!:number;
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
  verid(idpost:any){
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
    this.sub = this.userService.refresh.subscribe(() => {
      this.obtenerposts();
      
    })
  }

obtenerposts(){

  this.userService.obtenerPosts().subscribe((x)=>
  {

  this.post = x.data;
  //console.log(this.post);

  }
  )
}


}
