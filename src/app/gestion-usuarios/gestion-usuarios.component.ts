import { Component, OnInit } from '@angular/core';
import { MatPaginator,MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import {UsrService} from '../services/User.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  userdata:any;
  flag: boolean = false;
  subscription!: Subscription;
  displayedColumns: string[] = [
    'ID_Usuario',
    'urlImg',
    'username',
     'Correo',
     'ID_Rol',
     'Estatus',
     'Acciones'
  ];
  constructor(private Paginatorstr:MatPaginatorIntl,private usrService:UsrService) {
    this.Paginatorstr.itemsPerPageLabel = 'Registros por Pagina';
    this.dataSource.paginator = this.paginator;
    this.userdata=JSON.parse(localStorage.getItem('data')!);

   }

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  //Establece un Orden Utilizando Datos de la API
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

ChStatus(data:any){

  if(this.userdata.data.idUsuario!=data.idUsuario){
    if(data.Estatus=='2'){
      this.altastatus(data.idUsuario,data.Correo);
    }else{
      this.bajastatus(data.idUsuario,data.Correo);
    }
  }else{
    Swal.fire("ERROR","No puedes darte de alta / baja a ti mismo.","error");
  }


}


altastatus(data:number,correo:string){
  Swal.fire({
    title: 'Alerta',
    html: '¿Está seguro de realizar la operación?',

    showDenyButton: true,
    icon: 'info',
    customClass: {
      container: 'my-swal',
    },
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      this.usrService.daraltausr({
        idUsuario: data,
      }).subscribe(
        (x) => {
          Swal.fire('Enhorabuena', 'Estatus de usuario cambiado correctamente', 'success');
          this.obtenerusers();
          this.usrService.sendcorreodesban({
            correo:correo,
          }).subscribe((x)=>{


        })
        },
        (error) => console.log(error)
      );
    }
  });

}

bajastatus(data:number,correo:string){

  Swal.fire({
    title: 'Alerta',
    html: '¿Está seguro de realizar la operación? (por favor ingrese un motivo de baneo)',
    input:'text',
    showDenyButton: true,
    icon: 'info',
    customClass: {
      container: 'my-swal',
    },
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      this.usrService.darbajausr({
        idUsuario: data,
      }).subscribe(
        (x) => {
          Swal.fire('Enhorabuena', 'Estatus de usuario cambiado correctamente', 'success');
          this.obtenerusers();
          this.usrService.sendcorreoban({
            correo:correo,
            motivo:result.value,
          }).subscribe((x)=>{


        })



        },
        (error) => console.log(error)
      );
    }
  });

}





  ngOnInit(): void {
    this.obtenerusers();
  }

  obtenerusers(){
    this.usrService.obtenerUser().subscribe({
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
  dataSource= new MatTableDataSource<Usuario>();
}
