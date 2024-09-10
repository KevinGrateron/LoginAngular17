import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { newUser, User } from '../auth/user';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(environments.urlApi+"user/"+id).pipe(
      catchError(this.handleError)
    )
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(environments.urlApi+"user").pipe(
      catchError(this.handleError)
    )
  }

  createUser(userRequest: newUser) : Observable<newUser>{
    return this.http.post<newUser>(environments.urlHost+"auth/register", userRequest).pipe(
      catchError(this.handleError)
    );
  }
  updateUser(userRequest:User):Observable<any>
  {
    return this.http.put(environments.urlApi+"user", userRequest).pipe(
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

}
