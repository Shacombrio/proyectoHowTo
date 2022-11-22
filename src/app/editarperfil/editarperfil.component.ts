import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { editarperfil } from '../models/editarperfil.model';
import Swal from 'sweetalert2';
import { bajaUsuario } from '../models/TbajaUsuario.model';
import { Usuario } from '../models/usuario.model';
import { ConfigComponent } from '../config/config.component';
import { Teditarperfil } from '../models/Teditarperfil.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent implements OnInit {
  frmEditar!:FormGroup;
  sub!: Subscription;
  editarperfil!: Teditarperfil;
  arrayDatos!: Usuario;
  imgurl:any;
  public rutafoto:any;
  public message!:string;
  reader = new FileReader();
  @ViewChild('modal') modal !: ConfigComponent;
  constructor(private fb:FormBuilder, private userService: UsrService) {

  }

  ngOnInit(): void {

    if(localStorage.getItem('data') && localStorage.getItem('token')){
      this.editarperfil= JSON.parse(localStorage.getItem("data")!);
      this.imgurl= this.editarperfil.data.Imagen;

    }else{

    }
    console.log(this.editarperfil.data.Correo);

    this.createform();
  }

  createform(){
    this.frmEditar=this.fb.group({
      nombreEditar:[this.editarperfil.data.Nombre,Validators.required],
      usuarioEditar:[this.editarperfil.data.nombreUsuario,Validators.required],
      correoEditar:[this.editarperfil.data.Correo,Validators.required],
      filePost:[''],

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




 submit(){
      this.userService.editarperfil(
      {
        idUsuario: JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
        Nombre:this.frmEditar.controls['nombreEditar'].value,
        Correo: this.frmEditar.controls['correoEditar'].value,
        nombreUsuario: this.frmEditar.controls['usuarioEditar'].value,
        Imagen: this.reader.result,
        }
    ).subscribe( (x) =>{
      console.log(x);
      localStorage.removeItem('token');
      this.userService.saveToken(x.data);

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


   //Nos visualiza la imagen seleccionada en el input file
   preview(files: any) {
    if (files.length === 0) return;
    //Si el archivo tiene longitud verificaremos su MIME  y en caso de que no sea imagen termimos el proceso
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    //Instanciamos el lector de archivos

    this.rutafoto = files;
    this.reader.readAsDataURL(files[0]);
    this.reader.onload = (_event) => {
      this.imgurl = this.reader.result;
    };
  }

  

}


