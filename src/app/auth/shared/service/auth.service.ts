import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

   private isAuthenticated = false;

    login() {
     this.isAuthenticated = true;
   }
   logout() {
      this.isAuthenticated = false;
      window.localStorage.clear();
   }

   isLoggedIn(): boolean {
      return this.isAuthenticated;
   }


}
