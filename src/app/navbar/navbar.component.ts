import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TDataUser } from '../models/TDatauser.model';
import { UsrService } from '../services/User.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  admin = false;
  arraydatos!: TDataUser;

  constructor(private usrService: UsrService, private auth: UsrService) {
    
   }

  ngOnInit(): void {

    this.admin = JSON.parse(localStorage.getItem('tipoUser')||"{}") == "1";
    this.auth.getUserLoggedInStatus()
        .subscribe((customObject) => {
            // Make sure the desired value DOES EXIST!
            this.admin = JSON.parse(localStorage.getItem('tipoUser')||"{}") == "1";
        });
  }

  
  

  verificaradmin() {

  }



}
