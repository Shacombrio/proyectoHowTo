import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ChatComponent } from './chat/chat.component';
import { PreChatComponent } from './pre-chat/pre-chat.component';
import { PostsComponent } from './posts/posts.component';
import { CrearPostComponent } from './crear-post/crear-post.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { VerPostComponent } from './ver-post/ver-post.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { GuardianLoginGuard } from './guardianes/guardian-login.guard';
import { GuardianAdminGuard } from './guardianes/guardian-admin.guard';import { EditarPostComponent } from './editar-post/editar-post.component';
import { GestionCategoriasComponent } from './gestion-categorias/gestion-categorias.component';
const routes: Routes = [
  {path:"registro",component:RegistroComponent},
  {path:"editarperfil",component:EditarperfilComponent,canActivate:[GuardianLoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"preChat",component:PreChatComponent,canActivate:[GuardianLoginGuard]},
  {path:'chat',component:ChatComponent,canActivate:[GuardianLoginGuard]},
  {path:'posts', component: PostsComponent},
  {path:'crearPost',component:CrearPostComponent,canActivate:[GuardianLoginGuard]},
  {path:'posts',component:PostsComponent},
  {path:'verPost',component:VerPostComponent},
  {path:'gestionusers',component:GestionUsuariosComponent,canActivate:[GuardianAdminGuard]},
  {path:'editarPost',component:EditarPostComponent},
  {path:"gestiosCategorias",component:GestionCategoriasComponent,canActivate:[GuardianAdminGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule,FormsModule,AngularEditorModule,HttpClientModule],
 
  exports: [RouterModule]
})
export class AppRoutingModule {

}
