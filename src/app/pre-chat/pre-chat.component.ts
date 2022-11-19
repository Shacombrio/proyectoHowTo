import { Component, OnInit } from '@angular/core';
import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { config } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';



@Component({
  selector: 'app-pre-chat',
  templateUrl: './pre-chat.component.html',
  styleUrls: ['./pre-chat.component.css'],
})
export class PreChatComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  name = 'Angular 6';
  htmlContent = '';

  config: AngularEditorConfig = {
    
    editable: true,
    spellcheck: true,
    height: '50rem',
    minHeight: '5rem',
    placeholder: 'Enter text in this rich text editor....',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'Quote',
        class: 'quoteClass',
      },
      {
        name: 'Title Heading',
        class: 'titleHead',
        tag: 'h1',
      },
    ],
  };
  

}
