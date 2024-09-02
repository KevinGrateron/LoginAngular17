import { ErrorHandler, Injectable } from '@angular/core';
import { LoginRequets } from './LoginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn:BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:""});

  constructor(private http: HttpClient) { }

  login(credentials :LoginRequets): Observable<User>{
   return this.http.get<User>('../../../assets/login.json').pipe(
    tap((userData:User) => {
      this.currentUserData.next(userData),
      this.currentUserLoginOn.next(true);
    }),
    catchError(this.handleError)
   )
  }
  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.error("Se a producido un error"+ error.error);
    }else{
      console.error("El backend retorno el codido de estado"+error.status + error.error);
    }
    return throwError(() => new Error("Algo fallo. Intente porfavor nuevamente"));
  }

  get userData(): Observable<User>{
    return this.currentUserData.asObservable();
  }
  get loginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

}
