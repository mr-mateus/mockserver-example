import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export const LOGIN_URL = `${environment.apiUrl}/login`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post(LOGIN_URL, user);
  }
}
