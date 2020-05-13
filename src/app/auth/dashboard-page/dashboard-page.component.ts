import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  searchStr = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }
}
