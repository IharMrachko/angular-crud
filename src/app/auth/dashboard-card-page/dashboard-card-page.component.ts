import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserProfileService} from '../shared/service/userProfile.service';
import {UserProfile} from '../../shared/interfasec';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-card-page',
  templateUrl: './dashboard-card-page.component.html',
  styleUrls: ['./dashboard-card-page.component.scss']
})
export class DashboardCardPageComponent implements OnInit {

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

  delete(id: string) {
    this.userProfileService.delete(id).subscribe(() => {
      this.userProfile = this.userProfile.filter(pr => pr.id !== id);
      if (this.userProfile.length === 0){
        this.empty = false;
      }
    });
  }

}
