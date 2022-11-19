import { Component, createPlatform, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { editarperfil } from '../models/editarperfil.model';
import Swal from 'sweetalert2';
import { bajaUsuario } from '../models/TbajaUsuario.model';
import { Usuario } from '../models/usuario.model';
import { conf } from '../models/conf.model';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  frmConf!:FormGroup;
  sub!: Subscription;
  conf!: conf[];
  arrayDatos!: Usuario;
  public message!:string;
  reader = new FileReader();
  constructor(private fb:FormBuilder, private userService: UsrService) {

  }

  ngOnInit(): void {

    this.createform();
  }

  createform(){
    this.frmConf=this.fb.group({
      contraseñaconf:['', Validators.required],
      contraseña2conf:['', Validators.required]
    });
  }

  actualizar(){
    if(this.frmConf.controls['contraseñaconf'].value == this.frmConf.controls['contraseña2conf'].value){
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

  //eliminar cuenta 
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

//actualizar contraseña
 submit(){
      this.userService.cambiarcontraseña(
      {
        idUsuario: JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        Contra: this.frmConf.controls['contraseñaconf'].value
        }
    
    ).subscribe( (x) =>{
      console.log(x);

      Swal.fire({
       title: 'Datos modificados',
       html: 'Se actualizó la información',
       icon: 'success',
       customClass: {
         container: 'my-swal',
       },
     })
     window.location.reload();
    } )
  }


  

}


