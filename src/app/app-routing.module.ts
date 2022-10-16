import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ChatComponent } from './chat/chat.component';
import { PreChatComponent } from './pre-chat/pre-chat.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {path:"home",component:RegistroComponent},
  {path:"editarperfil",component:EditarperfilComponent},
  {path:"login",component:LoginComponent},
  {path:"preChat",component:PreChatComponent},
  {path:'chat/:id',component:ChatComponent},
  {path:'posts', component: PostsComponent}
];

export const APP_ROUTING = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
