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

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
  
})
export class PostsComponent implements OnInit {


  sub!: Subscription;
  post!: posts[];
  count!:contLikes;
  reaccion!:reaccion[];
  sumaLikes!: number;
  dato!:number;
  idpost!:number;
  public isClicked: boolean = false;
  //public tonoLike: string = "";
  @ViewChild('modal') modal !: CrearPostComponent;
  constructor(private userService: UsrService) { 

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
