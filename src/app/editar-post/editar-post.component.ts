import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { categoria } from '../models/cotegoria.model';
import { UsrService } from '../services/User.service';
import Swal from 'sweetalert2';
import { posts } from '../models/posts.model';
import { post } from '../models/post.model';
@Component({
  selector: 'app-editar-post',
  templateUrl: './editar-post.component.html',
  styleUrls: ['./editar-post.component.css']
})
export class EditarPostComponent implements OnInit {
  post!:posts[];
  post2!: post[];
  conte = "Hola" ;
  conte2 = ".";
  public rutafoto:any;
  imgurl:any;
  reader = new FileReader();
  frmPost!:FormGroup;
  name = 'Angular 6';
  htmlContent = 'hola a todos';
  categoria!: categoria[];
  ncat!:string;
  idcat!:any;
  idP!:any;
  titulo!:any;
  contenido!:any;
  imagen!:any;
  categoria2!:any;
  constructor(private fb:FormBuilder, private userService: UsrService) { 

  }

  ngOnInit(): void {
    this.obtenerLocalStorage();
    this.obtenerPostEditar();
    
    this.obtenerCategoria();
    this.verpost();
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
    placeholder: this.conte,
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
    console.log(this.titulo);
    console.log(this.contenido);
    this.frmPost=this.fb.group({
      tituloPost:["",Validators.required],
      textoPost:["",Validators.required],
      filePost:["",Validators.required],
      //categoriaPost:['',Validators.required],

    });

  }

  publicar(t:any,c:any,i:any){
    console.log(i);
    this.frmPost=this.fb.group({
      tituloPost:[t,Validators.required],
      textoPost:[c,Validators.required],
      filePost:[i,Validators.required],
      //categoriaPost:['',Validators.required],

    });
   // if(this.frmPost.valid)
   this.submit();
   //else{alert("ta mal");}
   
  }

  submit(){

    this.userService.modificarPostsPagina(
      {
        Contenido:this.htmlContent,
        idPost : this.idP
      }
    ).subscribe((x)=>{

    })


    this.userService.modificarPosts(
      {Titulo:this.frmPost.controls['tituloPost'].value,
      textoPost: this.frmPost.controls['textoPost'].value,
      idCategoria: this.idcat,
      imagen: this.reader.result,
      idPosts: this.idP
    }
      
    ).subscribe( (x) =>{
      Swal.fire({
       title: 'Post Editado',
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

  obtenerPostEditar(){
    this.userService.obtenerPostsUnico({
      idPosts: this.idP
    }).subscribe((x)=>{
      this.post=x.data;
      console.log(this.post);
      this.titulo = this.post[0].Titulo;
      this.contenido = this.post[0].textoPost;
      this.idcat = this.post[0].idCategoria;
      this.imagen = this.post[0].imagen;
      
    })
  }

  obtenerLocalStorage(){
    this.idP = localStorage.getItem("idPost");
    console.log(this.idP);
  }

  verpost(){
    
    console.log();
    this.userService.verPost(
      {
        idPost:this.idP
      }
    ).subscribe((x)=>
    {
      this.post2=x.data
      console.log(this.post);
      console.log(this.post);
      this.conte = this.post2[0].Contenido;
      //console.log(this.post[0].Contenido);
      this.conte2 = this.conte;
      this.conversion();
      console.log(this.conte2);
      this.htmlContent = this.conte2;
      //document.getElementById("principal")!.innerHTML=this.conte;
    }
    )
  }
   conversion(){
    console.log(this.conte2);
    const el = document.getElementById("principal");
    //this.dato = document.getElementById("principal");
    if (el != null){
      console.log("ENTROOOO");
      el.innerHTML = this.conte2;
    }
  }


}
