import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequets } from '../../services/auth/LoginRequest';

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
constructor(private loginService:LoginService){} // injecccion por medio del constructor

loginForm = this.formBuilder.group({
  email:["KevinGrateron@gmail.com",[Validators.required, Validators.email]],
  password:["", [Validators.required]]
});

ngOnInit(): void {
    
}

// get para manejo de errores
get email(){
   return this.loginForm.controls.email;
}

login(){
  if(this.loginForm.valid){
    this.loginService.login(this.loginForm.value as LoginRequets).subscribe({
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
        // this.route.navigate(['/inicio']); // de este manera tambien funcion el route entre componentes.
      }
    })
   
  }else{
    this.loginForm.markAllAsTouched();
    alert("El formulario no esta correctamente diligenciado.");
  }
}

}
