import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

loginError:string= "";

  private formBuilder = inject(FormBuilder); // injeccion por medio de inject
private route = inject(Router); // injeccion por medio de inject

loginForm = this.formBuilder.group({
  username:["",[Validators.required, Validators.email]],
  password:["", [Validators.required]]
});

constructor(private loginService:LoginService){} // injecccion por medio del constructor


ngOnInit(): void {
    
}

// get para manejo de errores
get email(){
   return this.loginForm.controls.username;
}

login(){
  if(this.loginForm.valid){
    this.loginError="";
    this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
      next: (userData) => {
        console.log(userData);
      },
      error: (error) =>{
        console.log(error);
        this.loginError=error;
      },
      complete: () => {
        console.log("Todo salio bien, Excelente!");
        this.route.navigateByUrl('/inicio');
        this.loginForm.reset();
        // this.route.navigate(['/inicio']); // de este manera tambien funcion el route entre componentes.
      }
    })
   
  }else{
    this.loginForm.markAllAsTouched();
    alert("El formulario no esta correctamente diligenciado.");
  }
}

}
