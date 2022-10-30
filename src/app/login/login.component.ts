import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  FrmLogin!:FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createform();
  }

  createform(){
    this.FrmLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit(){
    alert("hola");
  }


}
