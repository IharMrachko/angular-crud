import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/interfasec';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  private fbDbUrl = 'https://angular-crud-v2.firebaseio.com/';
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.fbDbUrl}/users.json`, user);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.fbDbUrl}/users.json`)
      .pipe(map((res: {[key: string]: any}) => {
        return Object
          .keys(res)
          .map(key => ({
            ...res[key]
          }));
      }));
  }
}
