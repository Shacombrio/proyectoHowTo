import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CrearPostComponent } from '../crear-post/crear-post.component';
import { Posts } from './posts.model';
import { Subscription } from 'rxjs';
import { UsrService } from '../services/User.service';
import { posts } from '../models/posts.model';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
  
})
export class PostsComponent implements OnInit {

  @Input () posts : Posts;
  sub!: Subscription;
  post!: posts[];
  sumaLikes!: number;
  
  public isClicked: boolean = false;
  @ViewChild('modal') modal !: CrearPostComponent;
  constructor(private userService: UsrService) { 
    this.posts = new Posts(
      '',
      '',
      0,
      0);
  }

  postitive(){
    //data +=1;
    //this.sumaLikes +=1;
  }

  negative(data:any){
    this.posts.negative();

  }

  ngOnInit(): void {
    this.obtenerposts();
    this.sub = this.userService.refresh.subscribe(() => {
      this.obtenerposts();  
    })
  }

obtenerposts(){

this.userService.obtenerPosts().subscribe((x)=>
{

this.post = x.data;
console.log(this.post);
}
)


}


}
