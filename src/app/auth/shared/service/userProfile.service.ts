import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserProfile} from '../../../shared/interfasec';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserProfileService {

  private fbDbUrl = 'https://angular-crud-v2.firebaseio.com/';
  constructor(private http: HttpClient) {}

  createUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.fbDbUrl}/usersProfile.json`, userProfile);
  }
  getUserProfileAll(): Observable<any> {
    return this.http.get(`${this.fbDbUrl}/usersProfile.json`)
      .pipe(map((res: {[key: string]: any}) => {
        if (res === null) {
          return;
        }
         return Object
          .keys(res)
          .map(key => ({
            ...res[key],
            id: key
          }));
      }));
  }

  getById(id: string): Observable<UserProfile>{
    return this.http.get<UserProfile>(`${this.fbDbUrl}/usersProfile/${id}.json`)
      .pipe(map((userProfile: UserProfile) => {
        return {
          ...userProfile, id
        };
      }));

  }

  upDate(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.fbDbUrl}/usersProfile/${userProfile.id}.json`, userProfile);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.fbDbUrl}/usersProfile/${id}.json`);
  }
}
