import { ErrorHandler, Injectable } from '@angular/core';
import { LoginRequest } from './LoginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from './user';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn:BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) { 
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!= null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token")|| "");
  }

  login(credentials :LoginRequest): Observable<any>{
   return this.http.post<any>(environments.urlHost+"auth/login", credentials).pipe(
    tap((userData) => {
      sessionStorage.setItem("token", userData.token),
      this.currentUserData.next(userData.token),
      this.currentUserLoginOn.next(true);
    }),
    map((userData) => userData.token),
    catchError(this.handleError)
   )
  }

  logout():void {
    sessionStorage.removeItem("token")
    this.currentUserLoginOn.next(false)
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.error("Se a producido un error"+ error.error);
    }else{
      console.error("El backend retorno el codido de estado"+error);
    }
    return throwError(() => new Error("Algo fallo. Intente porfavor nuevamente"));
  }

  get userData(): Observable<String>{
    return this.currentUserData.asObservable();
  }
  // get loginOn(): Observable<boolean>{
  //   return this.currentUserLoginOn.asObservable();
  // }
  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String {
    return this.currentUserData.value;
  }

}
