import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export const USERS_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${USERS_URL}/total`);
  }

  findAllPaging(page, size): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(USERS_URL, { params: params });
  }

  findByNameContaining(name: string, page: number, size: number): Observable<any> {
    const params = new HttpParams().set('name', name).set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(USERS_URL, { params: params });
  }
}
