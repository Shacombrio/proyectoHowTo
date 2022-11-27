import { Component, createPlatform, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { registro } from '../models/registroUsuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  frmRegistro!:FormGroup;
  sub!: Subscription;
  registro!: registro[];
  
  constructor(private fb:FormBuilder, private userService: UsrService,private router:Router) { 
    
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(){
    this.frmRegistro=this.fb.group({
      nombreRegistro:['',Validators.required],
      usuarioRegistro:['',Validators.required],
      correoRegistro:['',Validators.required],
      contraseñaRegistro:['', Validators.required],
      contraseña2Registro:['', Validators.required]
    });
  }

  registrar(){
    if(this.frmRegistro.valid)
    if(this.frmRegistro.controls['contraseñaRegistro'].value == this.frmRegistro.controls['contraseña2Registro'].value){
      this.submit();
    }else{
      Swal.fire({
        title: 'Las contraseñas no coinciden',
        html: 'Verifica los datos',
        icon: 'error',
        customClass: {
          container: 'my-swal',
        },
      })
    }
  


  }



 submit(){
  
      this.userService.registroUsuario(
      {
        Nombre:this.frmRegistro.controls['nombreRegistro'].value,
        Correo: this.frmRegistro.controls['correoRegistro'].value,
        nombreUsuario: this.frmRegistro.controls['usuarioRegistro'].value,
        Contra: this.frmRegistro.controls['contraseñaRegistro'].value,
        Estatus: 1,
        Imagen: "imagen.png",
        tipoUsuario: 1
      }

    ).subscribe( (x) =>{
      console.log(x)
      Swal.fire({
       title: 'Registro exitoso',
       html: 'Bienvenido',
       icon: 'success',
       customClass: {
         container: 'my-swal',
       },
     })
     this.router.navigate(['/login']); 
    } ) 
  }

 
    
  



   

}
