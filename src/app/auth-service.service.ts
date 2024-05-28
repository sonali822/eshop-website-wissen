import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://dummyjson.com/users';
  private loginApiUrl = 'https://dummyjson.com/auth/login';
  constructor(private httpClient: HttpClient) { }

  login(user: User, expiresInMins: number = 30): Observable<any> {
    return this.httpClient.post(this.loginApiUrl, {
      username: user.userName,
      password: user.password,
      expiresInMins: expiresInMins
    }).pipe(
      map(response => {
        // Process the response here if needed
        return response;
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/add`, user);
  }
}
