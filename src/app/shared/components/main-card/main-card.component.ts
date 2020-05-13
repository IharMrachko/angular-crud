import {Component, Input, OnInit} from '@angular/core';
import {UserProfile} from '../../interfasec';
import {UserProfileService} from '../../../auth/shared/service/userProfile.service';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent implements OnInit {

  @Input() searchStr: string;
  userProfile: UserProfile[];
  empty = false;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userProfileService.getUserProfileAll().subscribe(userProfile => {
      if (userProfile === undefined) {
        this.empty = false;
      } else {
        this.userProfile = userProfile;
        this.empty = true;
      }
    });

  }

}
