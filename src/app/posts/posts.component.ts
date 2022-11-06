import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CrearPostComponent } from '../crear-post/crear-post.component';
import { Posts } from './posts.model';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input () posts : Posts;
  @ViewChild('modal') modal !: CrearPostComponent;
  constructor() { 
    this.posts = new Posts(
      '',
      '',
      0,
      0);
  }
  
  postitive():boolean{
    this.posts.positibe();
    return false;
  }

  negative():boolean{
    this.posts.negative();
    return false;
  }

  ngOnInit(): void {
  }

  


}
