import { Component, createPlatform, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { Registro } from '../registro/registro.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  frmRegistro!:FormGroup;
  sub!: Subscription;
  registrar : Registro[];
  constructor(private fb:FormBuilder, private userService: UsrService) { 
    this.registrar=[
      new Registro('Pokemon','Post de pokemon',0,0 )
    ];
  }

  ngOnInit(): void {
    this.createform();

    this.sub = this.userService.refresh.subscribe(() => {
      
    })
  }

  createform(){
    this.frmRegistro=this.fb.group({
      tituloPost:['',Validators.required],
      textPost:['',Validators.required],
      filePost:[''],

    });

  }

  registrarse(title: HTMLInputElement, text: HTMLInputElement){
    this.nuevoregistro(title,text);
   // if(this.frmPost.valid)
   {this.submit();}
   //else{alert("ta mal");}
   
  }

  submit(){
    alert("Registro exitoso: ¡Bienvenido!");
  }

  nuevoregistro(title: HTMLInputElement, text: HTMLInputElement):boolean{
    this.registrar.push(new Registro(title.value,text.value,0))
    console.log(this.registrar);
    return false;
  }

  sortedArticles(): Registro[] {
    return this.registrar.sort((a:Registro,b:Registro)=>b.likes-a.likes);
  }
}
