import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsrService } from '../services/User.service';
import { chat } from '../models/chat.model';
import { Subscription } from 'rxjs';
import { ListKeyManager } from '@angular/cdk/a11y';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  sub!: Subscription;
  usuario!:Usuario[];
  nameUser!:any;
  chat!:chat[];
  clase!:string;
  user!:number;
  idDestino!:any;
  frmMsj!:FormGroup;
  constructor(private fb:FormBuilder, private userService: UsrService) { }

  ngOnInit(): void {
    this.createform();
    this.obtenerUsuarios();
    this.obtenerChat(this.idDestino,this.nameUser);
    this.sub = this.userService.refresh.subscribe(() => {
      this.obtenerChat(this.idDestino,this.nameUser);
    })
  }

  createform(){
    this.frmMsj=this.fb.group({
      msjChat:['',Validators.required]
    });

  }

  mensage(dato:any){
    alert(dato);
  }

  obtenerUsuarios(){
    this.userService.obtenerUser().subscribe((x)=>
    {
      this.usuario=x.data;
      console.log(this.usuario);
    }
    )
  }

  ingresarChat(){
    this.userService.ingresarChat(
      {
        idOrigen:JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        idDestino : this.idDestino,
        mensaje: this.frmMsj.controls['msjChat'].value
      }
    ).subscribe((x)=>
    {
      console.log(this.idDestino);
      this.obtenerChat(this.idDestino,this.nameUser);

    })
  }

  obtenerChat(idDestino:any,nu:any){

    this.nameUser = nu;
    this.idDestino = idDestino;
    this.userService.obtenerChat(
      {
        idOrigen:JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        idDestino:idDestino 
      }
    ).subscribe((x)=>
    {
      this.chat=x.data;
      console.log(this.chat);
      this.user= JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario
    }
    )
  }

  obtenerClase(){
    let content  = `  <div class="seccion-titulo">
    <h3>
        <i class="fas fa-comments"></i>
        Sistema de mensajeria howTo
    </h3>
</div>`
  
  }



}

