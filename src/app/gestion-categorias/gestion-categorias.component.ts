import { Component, OnInit } from '@angular/core';
import {UsrService} from '../services/User.service';
import { Subscription } from 'rxjs';
import { categoria } from '../models/cotegoria.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-gestion-categorias',
  templateUrl: './gestion-categorias.component.html',
  styleUrls: ['./gestion-categorias.component.css']
})
export class GestionCategoriasComponent implements OnInit {
  public rutafoto:any;
  imgurl:any;
  idCat!:any;
  estatus:any = 1;
  reader = new FileReader();
  frmCatm!:FormGroup;
  categoria!:categoria[];
  nombre!:any;
  flag: boolean = false;
  displayedColumns: string[] = ['ID', 'Icono', 'Nombre','Estatus','Acciones'];
  //dataSource = ELEMENT_DATA;
  constructor(private fb:FormBuilder,private usrService:UsrService) { }

  ngOnInit(): void {
    this.obtenerCategoria();
  }
  createform(){

  }
  variables(data:any){
    this.nombre = data.nombreCategoria;
    this.idCat = data.idCategoria;
    console.log(this.nombre);
    console.log(this.idCat);
  }

  variables2(data:any){
    this.nombre = data.nombreCategoria;
    this.idCat = data.idCategoria;
    if(data.Estatus == 1){
      this.estatus = 2;
    } else if (data.Estatus == 2){
    this.estatus = 1;
    }
    this.modCategoria(data.nombreCategoria);
  }

  obtenerCategoria(){
    this.usrService.mostrarCat().subscribe({
      error: (error) => {
        alert(error.error);
      },
      complete: () => {},
      next: (response) => {
        this.dataSource.data = response.data;
        
        console.log(response);
        this.flag = true;
      },
    });
  }

  eliminarCat(data:any){

    Swal.fire({
      title: '¿Esta seguro?',
      text: "La categoria se eliminara de forma permanente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, Eliminala'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usrService.EliminarCat(
          {
            idCategoria:data.idCategoria
          }
        ).subscribe((x)=>{
          this.obtenerCategoria();
          Swal.fire(
            'Eliminado',
            'La categoria fue eliminada',
            'success'
          )
        })
      }
    })
  }

  modCategoria(title:any){
    console.log(title);
    this.usrService.modificarCategoria({
      nombreCategoria:title,
      Estatus: this.estatus,
      Icono: this.reader.result,
      idCategoria : this.idCat
    }).subscribe((x)=>
    {
      this.obtenerCategoria();
      Swal.fire({
        title: 'Categoria editada',
        html: 'la categoria fue Editada',
        icon: 'success',
        customClass: {
          container: 'my-swal',
        },
      })
    }
    )
  }

  modEstatus(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }

  preview(files: any){
    this.rutafoto = files;
    this.reader.readAsDataURL(files[0]);
    this.reader.onload = (_event) => {
      this.imgurl = this.reader.result;
      console.log(this.reader.result);
    };
  }

  ingresarCategoria(title:any){
    console.log(title);
    this.usrService.ingresarCat({
      nombreCategoria:title,
      Estatus:1,
      Icono: this.reader.result,
    }).subscribe((x)=>
    
    {
      this.obtenerCategoria();
      Swal.fire({
        title: 'Categoria Ingresada',
        html: 'la categoria fue aceptada',
        icon: 'success',
        customClass: {
          container: 'my-swal',
        },
      })
    }
    
    )
    
  }
  dataSource= new MatTableDataSource<categoria>();
  
}
