import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TDataUser } from '../models/TDatauser.model';
import { UsrService } from '../services/User.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianAdminGuard implements CanActivate {

  constructor(private usrService:UsrService,private router:Router){

  }
  arraydatos!:TDataUser

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.usrService.islogin()){
        this.router.navigate(["posts"]);
        return false;
      }else{
        this.arraydatos=JSON.parse(localStorage.getItem("data")!);
        //alert(this.arraydatos.data.tipoUsuario);
          if(this.arraydatos.data.tipoUsuario!="1"){
          this.router.navigate(["login"]);
          return false;
        }
      }
      return true;
  }

}
