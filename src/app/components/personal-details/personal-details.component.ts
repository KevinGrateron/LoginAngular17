import { Component, inject } from '@angular/core';
import { User } from '../../services/auth/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { environments } from '../../../environments/environment';
import { LoginService } from '../../services/auth/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {

  errorMessage:String = "";
  user?:User;
  userLoginOn:boolean = false;
  editMode:boolean = false; 
  employeeForm: FormGroup;

  // private userServiceNew = inject(UserService);  // forma de hacerlo en versiones nuevas de angular
  private formBuilder = inject(FormBuilder);

  registerForm=this.formBuilder.group({
    id:[''],
    lastname:['',Validators.required],
    firstname:['', Validators.required],
    country:['',Validators.required]
  })

  constructor(private userService:UserService, private loginService:LoginService, private route:Router){
    this.userService.getUser(environments.userId).subscribe({
      next: (userData) => {
        this.user=userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.firstname.setValue( userData.firstname);
        this.registerForm.controls.lastname.setValue( userData.lastname);
        this.registerForm.controls.country.setValue( userData.country);
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data ok");
      }
    })

    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })
    // this.userService.getUser(environments.userId).subscribe({
    //   next : (userData) => {
    //     this.user = userData;
    //   },
    //   error:(errorMessage)=> {
    //     this.errorMessage = errorMessage;
    //   },
    //   complete : ()=>{
    //     console.info("Todo se termino bien.")
    //   }
    // })

    // username: string,
    // lastname: string,
    // firstname:string,
    // country:string; 

    this.employeeForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      country: ['', Validators.required], 
    });

  }

  // getters para acceder a los los formcontrol de cada campo del fomulario
  get firstname()
  {
    return this.registerForm.controls.firstname;
  }

  get lastname()
  {
    return this.registerForm.controls.lastname;
  }

  get country()
  {
    return this.registerForm.controls.country;
  }

  newUser(){
    if(this.employeeForm.valid){
      this.userService.createUser(this.employeeForm.value).subscribe({
        next: (data)=> {
          console.log("El usuario se creo correctamente.", data);
          this.employeeForm.reset();
        },
        error: (error)=> {
          console.log("Hubo un error a la hora de agregar el usuario."+error)
        }
      })
    }
  }
  
  savePersonalDetailsData()
  {
    if (this.registerForm.valid)
    {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }

  

}
