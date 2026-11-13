import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../core/api/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('/api/users');
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }
}
