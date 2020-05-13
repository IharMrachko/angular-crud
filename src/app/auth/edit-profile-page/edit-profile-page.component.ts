import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserProfileService} from '../shared/service/userProfile.service';
import {switchMap} from 'rxjs/operators';
import {UserProfile} from '../../shared/interfasec';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {

  form: FormGroup;
  userProfile: UserProfile;
  submitted = false;

  constructor(private actRouter: ActivatedRoute,
              private router: Router,
              private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.actRouter.params
      .pipe(switchMap((params: Params) => {
         return this.userProfileService.getById(params['id']);
        })
      ).subscribe((userProfile: UserProfile) => {
        this.userProfile = userProfile;
        this.form = new FormGroup({
        name: new FormControl(userProfile.name, [Validators.required]),
        work: new FormControl(userProfile.work, [Validators.required]),
        address: new FormControl(userProfile.address, [Validators.required]),
        phone: new FormControl(userProfile.phone, [Validators.required, Validators.pattern(new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"))]),
        email: new FormControl(userProfile.email, [Validators.required, Validators.email]),
        website: new FormControl(userProfile.website, [Validators.required, Validators.pattern(new RegExp("^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$"))]),
        url: new FormControl(userProfile.url, [Validators.required, Validators.pattern(new RegExp("(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)"))]),
        birthday: new FormControl(userProfile.birthday, [Validators.required, Validators.pattern(new RegExp("^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$"))]),
        age: new FormControl(userProfile.age, [Validators.required, Validators.pattern(new RegExp("^([1-9][0-9]?){0,1}$"))])
      });
    });

  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const upDateUserProfile = {
      id: this.userProfile.id,
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

    this.userProfileService.upDate(upDateUserProfile).subscribe(res => {
      this.submitted = false;
      this.router.navigate(['/auth', 'dashboard'], {
        queryParams: {
          upDate: true
        }
      });
    });

  }
}
