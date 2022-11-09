import { Component, createPlatform, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { Posts } from '../posts/posts.model';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';
import { categoria } from '../models/cotegoria.model';
@Component({
  selector: 'app-crear-post',
  templateUrl: './crear-post.component.html',
  styleUrls: ['./crear-post.component.css']
})
export class CrearPostComponent implements OnInit {
  frmPost!:FormGroup;
  posts : Posts[];
  categoria!: categoria[];
  ncat!:string;
  idcat!:string;
  constructor(private fb:FormBuilder, private userService: UsrService) { 
    this.posts=[
      new Posts ('Pokemon','Post de pokemon',0,0 )
    ];
  }

  ngOnInit(): void {
    this.createform();
    this.obtenerCategoria();
  }

  createform(){
    this.frmPost=this.fb.group({
      tituloPost:['',Validators.required],
      textoPost:['',Validators.required],
      filePost:[''],
      //categoriaPost:['',Validators.required],

    });

  }

  publicar(){
  
   // if(this.frmPost.valid)
   this.submit();
   //else{alert("ta mal");}
   
  }

  submit(){
    this.userService.ingresarPosts(
      {Titulo:this.frmPost.controls['tituloPost'].value,
      textoPost: this.frmPost.controls['textoPost'].value,
      idUsuario: JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
      idCategoria: this.idcat,
      likes:0,
      dislikes:0,
      Estatus: 1}
      
    ).subscribe( (x) =>{
      Swal.fire({
       title: 'Post publicado',
       html: 'la publicacion fue aceptada',
       icon: 'success',
       customClass: {
         container: 'my-swal',
       },
     })
    } )
  //sortedArticles(): Posts[] {
    //return this.posts.sort((a:Posts,b:Posts)=>b.likes-a.likes);
  //}
  }
  obtenerCategoria(){
    this.userService.mostrarCat().subscribe((x)=>
    {
      this.categoria=x.data;
      console.log(this.categoria);
    }
    )
  }

  selecCat(nombre:any,id:any){
    
    this.ncat=nombre;
    this.idcat=id;
  }
}
