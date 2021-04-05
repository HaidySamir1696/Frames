import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://localhost:3000/"

  constructor(private http: HttpClient) { }

  login(userdata : any){
    return this.http.post(this.baseUrl+'users/login',userdata)
  }

  getToken(){
      return localStorage.getItem('token');

  }
}
