import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  userLoginOn:boolean = false;

  constructor(private loginService:LoginService, private route:Router){}


  ngOnInit(): void {
      this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      })
  }
  
  logout(){
    this.loginService.logout();
    this.route.navigate(['/iniciar-sesion']);
  }

}
