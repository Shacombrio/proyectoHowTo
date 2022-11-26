import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MatPaginator,MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { UsrService } from '../services/User.service';
import { posts } from '../models/posts.model';
@Component({
  selector: 'app-gestion-publicaciones',
  templateUrl: './gestion-publicaciones.component.html',
  styleUrls: ['./gestion-publicaciones.component.css']
})
export class GestionPublicacionesComponent implements OnInit {

  userdata:any;
  flag: boolean = false;
  subscription!: Subscription;
  displayedColumns: string[] = [
    'idPosts',
    'urlImg',
    'Titulo',
     'Contenido',
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
    if(data.Estatus=='2'){
      this.altastatus(data.idPosts);
    }else{
      this.bajastatus(data.idPosts);
    }
}


altastatus(data:number){
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
      this.usrService.daraltaPosts({
        idPosts: data,
      }).subscribe(
        (x) => {
          Swal.fire('Enhorabuena', 'Estatus de usuario cambiado correctamente', 'success');
          this.obtenerusers();
        },
        (error) => console.log(error)
      );
    }
  });

}

bajastatus(data:number){

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
      this.usrService.darbajaPosts({
        idPosts: data,
      }).subscribe(
        (x) => {
          Swal.fire('Enhorabuena', 'Estatus de usuario cambiado correctamente', 'success');
          this.obtenerusers();
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
    this.usrService.obtenerPostsAdmin().subscribe({
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
  dataSource= new MatTableDataSource<posts>();

}
