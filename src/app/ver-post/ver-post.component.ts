import { Component, OnInit , Input} from '@angular/core';
import { post } from '../models/post.model';
import { UsrService } from '../services/User.service';
import { VariablesService } from '../services/variables.service';
@Component({
  selector: 'app-ver-post',
  templateUrl: './ver-post.component.html',
  styleUrls: ['./ver-post.component.css']
})
export class VerPostComponent implements OnInit {
  post!:post[];
   conte = "Hola" ;
   conte2 = ".";
   id = "principal";
  dato : string = "pri";
  //@Input() hijoIdPost:any;
  postId!:any;
  
  constructor(private userService: UsrService, private servVar:VariablesService) { }


  ngOnInit(): void {
    this.verpost();
    this.servVar.disparador.subscribe(data => {
      this.postId = data;
      
    })

  }

  verpost(){
    console.log();
    this.userService.verPost(
      {
        idPost:1
      }
    ).subscribe((x)=>
    {
      this.post=x.data
      console.log(this.post);
      console.log(this.post);
      this.conte = this.post[0].Contenido;
      console.log(this.post[0].Contenido);
      this.conte2 = this.conte;
      this.conversion();
      //document.getElementById("principal")!.innerHTML=this.conte;
    }
    )
  }
   conversion(){
    console.log(this.conte2);
    const el = document.getElementById("principal");
    //this.dato = document.getElementById("principal");
    if (el != null){
      console.log("ENTROOOO");
      el.innerHTML = this.conte2;
    }
  }
  checar(dato:any){

  }
}
