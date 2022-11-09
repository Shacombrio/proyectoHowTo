import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-chat',
  templateUrl: './pre-chat.component.html',
  styleUrls: ['./pre-chat.component.css']
})
export class PreChatComponent implements OnInit {
  User = {
    name: ''
  }
  constructor() { }

  ngOnInit(): void {
  }

  
}
