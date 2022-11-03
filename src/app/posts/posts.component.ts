import { Component, OnInit, ViewChild } from '@angular/core';
import { CrearPostComponent } from '../crear-post/crear-post.component';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  @ViewChild('modal') modal !: CrearPostComponent;
  constructor() { }
  
  ngOnInit(): void {
  }

  


}
