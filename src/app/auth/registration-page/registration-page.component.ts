import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfasec';
import {ConfirmedValidator} from '../shared/confirmed.validator';
import {Router} from '@angular/router';
import {UserService} from '../shared/service/user.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  fieldTextType: boolean;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.forbiddenEmail.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.userService.createUser(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/auth', 'login'], {
        queryParams: {
          nowCanLogin: true
        }
      });
    });

  }

  forbiddenEmail(control: FormControl ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.userService.getUser().subscribe( (res) => {
         const email = res.map(e => e.email);
         const checkedEmail = control.value;
         const isEmail = email.includes(checkedEmail);
          if (isEmail) {
             resolve({forbiddenEmail: true});
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
