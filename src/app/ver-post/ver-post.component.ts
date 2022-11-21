import { Component, OnInit , Input} from '@angular/core';
import { post } from '../models/post.model';
import { UsrService } from '../services/User.service';
import { VariablesService } from '../services/variables.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { comentarios } from '../models/comentarios.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ver-post',
  templateUrl: './ver-post.component.html',
  styleUrls: ['./ver-post.component.css']
})
export class VerPostComponent implements OnInit {
  sub!: Subscription;
  comen!:comentarios[];
  post!:post[];
  frmCom!:FormGroup;
   conte = "Hola" ;
   conte2 = ".";
   id!:any;
  dato : string = "pri";
  idUser!:any;
  //@Input() hijoIdPost:any;
  postId!:any;
  imagenUser! : any;
  constructor(private userService: UsrService, private servVar:VariablesService, private fb:FormBuilder) { }


  ngOnInit(): void {
    this.imagenUser = JSON.parse( localStorage.getItem("data") || '{}' ).data.Imagen;
    console.log(this.imagenUser);
    this.createform();
    this.obtenerLocalStorage();
    this.verpost();
    this.servVar.disparador.subscribe(data => {
      this.postId = data;
      
    })
    this.obtenerComentarios();
    this.sub = this.userService.refresh.subscribe(() => {
      this.obtenerComentarios();
      
    })
  }

  createform(){
    this.frmCom=this.fb.group({
      comentario:['',Validators.required]
    });

  }

  obtenerLocalStorage(){
    this.id = localStorage.getItem("idPost");
    console.log(this.id);
  }

  ingresarComentario(){
    this.userService.ingresarComentario(
      {
        texto: this.frmCom.controls['comentario'].value,
        idUsuario: JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        idPost:this.id
      }
    ).subscribe((x)=>
    {
      //console.log(this.idDestino);
      //this.obtenerChat(this.idDestino,this.nameUser, this.imagenUser);

    })
  }

  eliminarComentario(id:any){
    this.userService.eliminarComentario(
      {
        idComentario: id
      }
    ).subscribe((x)=>
    {
      //console.log(this.idDestino);
      //this.obtenerChat(this.idDestino,this.nameUser, this.imagenUser);

    })
  }

  obtenerComentarios(){
    this.idUser = JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario;
    this.userService.obtenerComentarios(
      {
        idPost:this.id
      }
    ).subscribe((x)=>
    {
      this.comen = x.data;
      console.log(this.comen);
      //console.log(this.idDestino);
      //this.obtenerChat(this.idDestino,this.nameUser, this.imagenUser);

    })
  }

  verpost(){
    console.log();
    this.userService.verPost(
      {
        idPost:this.id
      }
    ).subscribe((x)=>
    {
      this.post=x.data
      console.log(this.post);
      console.log(this.post);
      this.conte = this.post[0].Contenido;
      console.log(this.post[0].Contenido);
      this.conte2 = this.conte;
      this.conversion();
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
  checar(dato:any){

  }
}
