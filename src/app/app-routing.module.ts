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
import { PrincipalComponent } from './principal/principal.component';
import { fav } from './models/fav.model';
import { FavsComponent } from './favs/favs.component';
import { MispostsComponent } from './misposts/misposts.component';
import { GestionCategoriasComponent } from './gestion-categorias/gestion-categorias.component';
import { GestionPublicacionesComponent } from './gestion-publicaciones/gestion-publicaciones.component';

const routes: Routes = [
  {path:"registro",component:RegistroComponent},
  {path:"editarperfil",component:EditarperfilComponent,canActivate:[GuardianLoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"preChat",component:PreChatComponent,canActivate:[GuardianLoginGuard]},
  {path:'chat',component:ChatComponent,canActivate:[GuardianLoginGuard]},
  {path:'posts', component: PostsComponent,canActivate:[GuardianLoginGuard]},
  {path:'crearPost',component:CrearPostComponent,canActivate:[GuardianLoginGuard]},
  {path:'posts',component:PostsComponent,canActivate:[GuardianLoginGuard]},
  {path:'verPost',component:VerPostComponent,canActivate:[GuardianLoginGuard]},
  {path:'gestionusers',component:GestionUsuariosComponent,canActivate:[GuardianAdminGuard]},
  {path:'editarPost',component:EditarPostComponent,canActivate:[GuardianLoginGuard]},
  {path:'Home',component:PrincipalComponent},
  {path:'favs',component:FavsComponent,canActivate:[GuardianLoginGuard]},
  {path:'misposts',component:MispostsComponent,canActivate:[GuardianLoginGuard]},
  {path:'gestiosCategorias',component:GestionCategoriasComponent,canActivate:[GuardianLoginGuard]},
  {path:'gestionPosts',component:GestionPublicacionesComponent,canActivate:[GuardianLoginGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule,FormsModule,AngularEditorModule,HttpClientModule],
 
  exports: [RouterModule]
})
export class AppRoutingModule {

}
