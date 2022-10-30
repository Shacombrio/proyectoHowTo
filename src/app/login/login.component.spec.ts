import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        AppComponent
       ],
       imports:[
        ReactiveFormsModule,
        FormsModule
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe poder inicializarse correctamente', () => {
    /*const fixture=TestBed.createComponent(LoginComponent);
    const app=fixture.componentInstance;
    expect(app).toBeTruthy();*/
    //instancio el componente
    let frm!:FormBuilder
    const form=new LoginComponent(frm);
    //se espera que se cree
    expect(form).toBeTruthy();
  });

  it('El formulario debe de inicializarse con los campos vacíos',()=>{
    //instancio el componente
    let frm!:FormBuilder
    const form=new LoginComponent(frm);
    //verificamos que una vez inicializados los componentes, salgan vacios
    expect(form.FrmLogin.controls['Correo'].value).toBe('');
    expect(form.FrmLogin.controls['password'].value).toBe('');
  });

  it('si uno de los valores introducidos al form es invalido, debe regresar true',()=>{
    let frm!:FormBuilder
    const form=new LoginComponent(frm);
    expect(form.submit()).toBe(false);//estamos esperando que al llamar a submit, nos regrese un true
  });

});
