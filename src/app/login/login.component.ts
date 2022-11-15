import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginModel } from '../models/login.model';
import { UsrService } from '../services/User.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  FrmLogin!:FormGroup;
  
  constructor(private fb:FormBuilder,private usuarioService:UsrService,private router:Router) {

   }

  ngOnInit(): void {

     this.createform();
  }

  createform(){
        this.FrmLogin = this.fb.group({
        Correo: ['', [Validators.required, Validators.email]],
        Password: ['', Validators.required],
      });
   }

  submit(){
   // alert(this.FrmLogin.controls['Correo'].value);
    if(this.FrmLogin.valid)
    this.login();

  }
  login(){
     //Aqui se consumira el Servicio del Login
     this.usuarioService.login(
      new LoginModel(
        this.FrmLogin.controls['Correo'].value,
        this.FrmLogin.controls['Password'].value
      )
    ).subscribe(
        (x) => {
         // const date = new Date();
         // this.hideModal();
          this.usuarioService.saveToken(x.data);
          //window.location.reload();
          console.log("jalo we");
          Swal.fire({
            title: 'Login correcto',
            html: 'Acceso',
            icon: 'success',
            customClass: {
              container: 'my-swal',
            },
            
          })

          this.router.navigate(['/posts']); 
        },
        (error) =>
          Swal.fire({
            title: 'Alerta',
            html: 'Error: ' + error.error.data,
            icon: 'error',
            customClass: {
              container: 'my-swal',
            },
          })
      );
  }

}
