import { Component, createPlatform, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { editarperfil } from '../models/editarperfil.model';
import Swal from 'sweetalert2';
import { bajaUsuario } from '../models/TbajaUsuario.model';
import { TUsuario } from '../models/TUsuario.model';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent implements OnInit {
  frmEditar!:FormGroup;
  sub!: Subscription;
  editarperfil!: editarperfil[];
  arrayDatos!: TUsuario ;
  imgurl:any;
  public rutafoto:any;
  public message!:string;
  reader = new FileReader();
  constructor(private fb:FormBuilder, private userService: UsrService) {

  }

  ngOnInit(): void {

    if(localStorage.getItem("data")){
      this.arrayDatos= JSON.parse(localStorage.getItem('data')!);
      this.imgurl= this.arrayDatos.data.Imagen;

    }
    this.createform();
  }

  createform(){
    this.frmEditar=this.fb.group({
      nombreEditar:[this.arrayDatos.data.Nombre,Validators.required],
      usuarioEditar:[this.arrayDatos.data.nombreUsuario,Validators.required],
      correoEditar:[this.arrayDatos.data.Correo,Validators.required],
      contraseñaEditar:['', Validators.required],
      contraseña2Editar:['', Validators.required],
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


  meterdatos(){
    this.frmEditar.controls["nombreEditar"].setValue(this.arrayDatos.data.Nombre);
    this.frmEditar.controls["usuarioEditar"].setValue(this.arrayDatos.data.nombreUsuario);
    this.frmEditar.controls["correoEditar"].setValue(this.arrayDatos.data.Correo);

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
        Estatus: 1,
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


