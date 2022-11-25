import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CrearPostComponent } from '../crear-post/crear-post.component';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { posts } from '../models/posts.model';
import { reaccion } from '../models/reacciones.model';
import { contLikes } from '../models/conteoLikes.model';
import {FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { VariablesService } from '../services/variables.service';
import { Router } from '@angular/router';
import { categoria } from '../models/cotegoria.model';
import { mostrarfav } from '../models/mostrarfav.model';
import { CatfavModel } from '../models/catfav.model';



@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
  
})
export class FavsComponent implements OnInit {
  toastTrigger!:any;
  toastLiveExample!:any;
  bootstrap!:any;
  pibote:any = 1;
  ncat!:string;
  idcat!:number;
  categoria!:categoria[];
  favoritos!:posts[];
  sub!: Subscription;
  post!: posts[];
  tam:number=75;
  masMenos:string="Leer mas";
  count!:contLikes;
  reaccion!:reaccion[];
  sumaLikes!: number;
  dato!:number;
  idpost!:number;
  color!:string;
  idP:any="";
  idUser!:any;
  public isClicked: boolean = false;
  //public tonoLike: string = "";
  @ViewChild('modal') modal !: CrearPostComponent;
  constructor(private userService: UsrService, private servVar:VariablesService,private router:Router) { 

  }

  


  view(){
    this.tam = 200;
  }

  leerMas(){
    if(this.masMenos=="Leer mas"){
      this.tam = 200;  
      this.masMenos="Leer menos";
    }else{
      this.tam=75;
      this.masMenos="Leer mas";
    }
  }



  getColorCard(d: any,id:any) {
    let color: string;
    if (d = this.idP){
      return color = '#008000';
    }

    return 0;
  }
  verid(idpost:any): void{
    console.log(idpost);
    console.log("hola");
    this.servVar.disparador.emit(idpost);
    this.router.navigate(['/verPost']); 
  }




  ngOnInit(): void {
 
    this.obtenerpostsfav();
    this.obtenerCategoria();
    this.sub = this.userService.refresh.subscribe(() => {
      this.obtenerpostsfav();
      
    })
  }

obtenerpostsfav(){
  this.idUser = JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario;
  //this.idUser = 2;
  console.log(this.idcat);
  if( this.pibote==1){
    this.userService.mostrarfav({ 
      idUsuario:JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
      //idUsuario: 2
    }).subscribe((x)=>
    {
      this.favoritos = x.data;
  
      //console.log("sdfsdfs",this.favoritos);
    })
  }else {
    this.userService.mostrarCatFav(
      new CatfavModel(
        3, 
        this.idcat
      )
    ).subscribe((x)=>
    {
      this.favoritos = x.data;
  
      //console.log("sdfsdfs",this.favoritos);
    })
  }



}

selecCat(nombre:any,id:any){
  if(id==0){
    this.pibote = 1;
    this.obtenerpostsfav();
    this.ncat = "";
  }else{
  this.ncat=nombre;
  this.idcat=id;
  this.pibote = 2;
  this.obtenerpostsfav();
  }
}

obtenerCategoria(){
  this.userService.mostrarCat().subscribe((x)=>
  {
    this.categoria=x.data;
    console.log(this.categoria);
  }
  )
}

eliminarfav(idpost:any){
  this.userService.eliminarfav(
    { 
      idUsuario:JSON.parse( localStorage.getItem("data") || '{}' ).data.idUsuario,
      //idUsuario: 2,
      idPosts: idpost,
      
    }
  ).subscribe( (x) =>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se eliminó de favoritos',
      showConfirmButton: false,
      timer: 1500
    })
  } )
  
}

grabarLocalStorage(idP:any){
  let id:any = idP;
  localStorage.setItem("idPost",id);
  this.router.navigate(['/verPost']); 
}

grabarLocalStorage2(idP:any){
  let id:any = idP;
  localStorage.setItem("idPost",id);
  this.router.navigate(['/editarPost']); 
}




}
