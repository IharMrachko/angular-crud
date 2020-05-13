import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfasec';
import {AuthService} from '../shared/service/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../shared/service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  fieldTextType: boolean;

  constructor(private auth: AuthService,
              private userService: UserService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)], this.forbiddenPassword.bind(this))
    });
  }

  onSubmit() {

    if (this.form.invalid) {
     return;
   }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    this.form.reset();
    this.auth.login();
    this.router.navigate(['/auth', 'dashboard']);
  }
  forbiddenEmail(control: FormControl ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.userService.getUser().subscribe( (res) => {
        const email = res.map(e => e.email);
        const checkedEmail = control.value;
        const isEmail = email.includes(checkedEmail);
        if (!isEmail) {
          resolve({forbiddenEmail: true});
        } else {
          resolve(null);
        }
      });

    });
  }

  forbiddenPassword(control: FormControl ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.userService.getUser().subscribe( (res) => {
        const password = res.map(e => e.password);
        const checkedPassword = control.value;
        const isPassword = password.includes(checkedPassword);
        if (!isPassword) {
          resolve({forbiddenPassword: true});
        } else {
          resolve(null);
        }
      });

    });
  }

  toggleFieldTextType(e: Event) {
    e.preventDefault();
    this.fieldTextType = !this.fieldTextType;
  }

}
