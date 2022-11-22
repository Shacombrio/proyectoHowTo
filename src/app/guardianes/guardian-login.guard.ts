import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsrService } from '../services/User.service';
@Injectable({
  providedIn: 'root'
})
export class GuardianLoginGuard implements CanActivate {

constructor(private usrService:UsrService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.usrService.isadmin()){
      this.router.navigate(["posts"]);
      return false;
    }
    return true;
  }




}
