import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ChatComponent } from './chat/chat.component';
import { PreChatComponent } from './pre-chat/pre-chat.component';
import { PostsComponent } from './posts/posts.component';
import { CrearPostComponent } from './crear-post/crear-post.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { GuardianLoginGuard } from './guardianes/guardian-login.guard';
import { GuardianAdminGuard } from './guardianes/guardian-admin.guard';
const routes: Routes = [
  {path:"home",component:RegistroComponent},
  {path:"editarperfil",component:EditarperfilComponent,canActivate:[GuardianLoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"preChat",component:PreChatComponent,canActivate:[GuardianLoginGuard]},
  {path:'chat/:id',component:ChatComponent,canActivate:[GuardianLoginGuard]},
  {path:'posts', component: PostsComponent},
  {path:'crearPost',component:CrearPostComponent,canActivate:[GuardianLoginGuard]},
  {path:'gestionusers',component:GestionUsuariosComponent,canActivate:[GuardianAdminGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
