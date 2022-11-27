import { Component, createPlatform, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { Posts } from '../posts/posts.model';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';
import { categoria } from '../models/cotegoria.model';
import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { config } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-post',
  templateUrl: './crear-post.component.html',
  styleUrls: ['./crear-post.component.css']
})
export class CrearPostComponent implements OnInit {
  public rutafoto:any;
  imgurl:any;
  reader = new FileReader();
  frmPost!:FormGroup;
  name = 'Angular 6';
  htmlContent = '';
  categoria!: categoria[];
  ncat!:string;
  idcat!:string;
  constructor(private fb:FormBuilder, private userService: UsrService,private router:Router) { 

  }

  ngOnInit(): void {
    this.createform();
    this.obtenerCategoria();
  }

  preview(files: any){
    this.rutafoto = files;
    this.reader.readAsDataURL(files[0]);
    this.reader.onload = (_event) => {
      this.imgurl = this.reader.result;
      console.log(this.reader.result);
    };
  }

  config: AngularEditorConfig = {
    
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '5rem',
    placeholder: 'Enter text in this rich text editor....',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'Quote',
        class: 'quoteClass',
      },
      {
        name: 'Title Heading',
        class: 'titleHead',
        tag: 'h1',
      },
    ],
  };

  createform(){
    this.frmPost=this.fb.group({
      tituloPost:['',Validators.required],
      textoPost:['',Validators.required],
      filePost:['',Validators.required],
      //categoriaPost:['',Validators.required],

    });

  }

  publicar(){
  
   // if(this.frmPost.valid)
   this.submit();
   //else{alert("ta mal");}
   
  }

  cancelar(){
    this.router.navigate(['/posts']); 
  }

  submit(){

    this.userService.guardarPost(
      {
        Contenido:this.htmlContent,
        idUsuario: JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
      }
    ).subscribe((x)=>{

    })


    this.userService.ingresarPosts(
      {Titulo:this.frmPost.controls['tituloPost'].value,
      textoPost: this.frmPost.controls['textoPost'].value,
      idUsuario: JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
      idCategoria: this.idcat,
      likes:0,
      dislikes:0,
      Estatus: 1,
      imagen: this.reader.result,
    }
      
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
