import { Component, createPlatform, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { editarperfil } from '../models/editarperfil.model';
import Swal from 'sweetalert2';
import { bajaUsuario } from '../models/TbajaUsuario.model';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent implements OnInit {
  frmEditar!:FormGroup;
  sub!: Subscription;
  editarperfil!: editarperfil[];

  constructor(private fb:FormBuilder, private userService: UsrService) { 
    
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(){
    this.frmEditar=this.fb.group({
      nombreEditar:['',Validators.required],
      usuarioEditar:['',Validators.required],
      correoEditar:['',Validators.required],
      contraseñaEditar:['', Validators.required],
      contraseña2Editar:['', Validators.required]
  });

  }

  actualizar(){
    if(this.frmEditar.controls['contraseñaEditar'].value == this.frmEditar.controls['contraseña2Editar'].value){
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

  baja(){
    this.submit2();
  }
submit2(){
  this.userService.bajaUsuario(
    new bajaUsuario(
      JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario
    )
    ).subscribe( (x) =>{
      console.log(x)
      Swal.fire({
       title: 'Se ha eliminado la cuenta',
       html: 'Vuelve pronto :)',
       icon: 'success',
       customClass: {
         container: 'my-swal',
       },
     })
    
    } )
}
 submit(){
      this.userService.editarperfil(
      {
        idUsuario: JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        Nombre:this.frmEditar.controls['nombreEditar'].value,
        Correo: this.frmEditar.controls['correoEditar'].value,
        nombreUsuario: this.frmEditar.controls['usuarioEditar'].value,
        Contra: this.frmEditar.controls['contraseñaEditar'].value,
        Estatus: 1,
        Imagen: "imagen.png",
        tipoUsuario: 1
      }

    ).subscribe( (x) =>{
      console.log(x)
      Swal.fire({
       title: 'Datos modificados',
       html: 'Se actualizó la información',
       icon: 'success',
       customClass: {
         container: 'my-swal',
       },
     })
    
    } ) 
  }

}


