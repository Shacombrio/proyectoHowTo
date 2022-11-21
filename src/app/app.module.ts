import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RegistroComponent} from './registro/registro.component';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';
import { ChatComponent } from './chat/chat.component';
import { PreChatComponent } from './pre-chat/pre-chat.component';
import { PostsComponent } from './posts/posts.component';
import { CrearPostComponent } from './crear-post/crear-post.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { VerPostComponent } from './ver-post/ver-post.component';
//import { config } from 'process';
import { ConfigComponent } from './config/config.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    EditarperfilComponent,
    ChatComponent,
    PreChatComponent,
    PostsComponent,
    CrearPostComponent,
    VerPostComponent,
    ConfigComponent,
    GestionUsuariosComponent,
    EditarperfilComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
    AngularEditorModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
