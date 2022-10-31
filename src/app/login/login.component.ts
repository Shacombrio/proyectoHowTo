import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  FrmLogin=new FormGroup({
    Correo:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required)
  });
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    // this.createform();
  }

  // createform(){
  //      this.FrmLogin = this.fb.group({
  //      correo: ['', [Validators.required, Validators.email]],
  //      password: ['', Validators.required],
  //    });
  // }

  submit(){
   // alert(this.FrmLogin.controls['Correo'].value);
    if(this.FrmLogin.valid)

  }


}
