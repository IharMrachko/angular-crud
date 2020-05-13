import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserProfileService} from '../shared/service/userProfile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-profile-page',
  templateUrl: './add-profile-page.component.html',
  styleUrls: ['./add-profile-page.component.scss']
})
export class AddProfilePageComponent implements OnInit {

  form: FormGroup;

  constructor(private userProfileService: UserProfileService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      work: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"))]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      website: new FormControl(null, [Validators.required, Validators.pattern(new RegExp("^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$"))]),
      url: new FormControl(null, [Validators.required, Validators.pattern(new RegExp("(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)"))]),
      birthday: new FormControl(null, [Validators.required, Validators.pattern(new RegExp("^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$"))]),
      age: new FormControl(null, [Validators.required, Validators.pattern(new RegExp("^([1-9][0-9]?){0,1}$"))])
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const userProfile = {
      name: this.form.value.name,
      work: this.form.value.work,
      address: this.form.value.address,
      phone: this.form.value.phone,
      email: this.form.value.email,
      website: this.form.value.website,
      url: this.form.value.url,
      birthday: this.form.value.birthday,
      age: this.form.value.age
    };

    this.userProfileService.createUserProfile(userProfile).subscribe(res => {

      this.router.navigate(['/auth', 'dashboard']);
    });
  }
}
