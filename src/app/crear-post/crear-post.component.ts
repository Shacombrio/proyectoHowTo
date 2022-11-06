import { Component, createPlatform, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { Posts } from '../posts/posts.model';
@Component({
  selector: 'app-crear-post',
  templateUrl: './crear-post.component.html',
  styleUrls: ['./crear-post.component.css']
})
export class CrearPostComponent implements OnInit {
  frmPost!:FormGroup;
  sub!: Subscription;
  posts : Posts[];
  constructor(private fb:FormBuilder, private userService: UsrService) { 
    this.posts=[
      new Posts ('Pokemon','Post de pokemon',0,0 )
    ];
  }

  ngOnInit(): void {
    this.createform();

    this.sub = this.userService.refresh.subscribe(() => {
      
    })
  }

  createform(){
    this.frmPost=this.fb.group({
      tituloPost:['',Validators.required],
      textPost:['',Validators.required],
      filePost:[''],

    });

  }

  publicar(title: HTMLInputElement, text: HTMLInputElement){
    this.nuevopost(title,text);
   // if(this.frmPost.valid)
   {this.submit();}
   //else{alert("ta mal");}
   
  }

  submit(){
    alert("ta bien");
  }

  nuevopost(title: HTMLInputElement, text: HTMLInputElement):boolean{
    this.posts.push(new Posts (title.value,text.value,0))
    console.log(this.posts);
    return false;
  }

  sortedArticles(): Posts[] {
    return this.posts.sort((a:Posts,b:Posts)=>b.likes-a.likes);
  }
}
