import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  userLoginOn:boolean = false;
  userList:User[] = [];



constructor(private loginService:LoginService, private userService: UserService, private route: Router){
  this.loginService.userLoginOn.subscribe({
    next:(userLoginOn) => {
      this.userLoginOn=userLoginOn;
    }
  })
}
ngOnInit(): void {
  if(this.userLoginOn === false){
    this.route.navigate(['/iniciar-sesion']);
  }else{
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.userList = data;
        console.log("Los Datos se recogieron correctamente.");
      },
      error:(errorMessage) => {
        console.log("Hubo un error."+errorMessage);
      }
    })
  }

}
}