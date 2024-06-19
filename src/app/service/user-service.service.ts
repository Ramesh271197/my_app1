import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  saveUser(user: User): any {
    return this.http.post('http://localhost:8080/users', user).subscribe(
      (response) => {
        console.log('User saved successfully:', response);
      },
      (error) => {
        console.error('Error saving user:', error);
      }
    );
  }
}