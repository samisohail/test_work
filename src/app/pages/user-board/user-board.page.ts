import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { UserServices } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.page.html',
  styleUrls: ['./user-board.page.scss'],
})
export class UserBoardPage implements OnInit {

  sub: Subscription;
  connectionUserId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServices
  ) { }

  ngOnInit() {
    console.log('current user: ', this.userService.currentSelectUserId);
    this.sub = this.route.queryParams.subscribe(params => {
      this.connectionUserId = params[`connectionUserId`] || null;
      console.log(this.connectionUserId);
    });
  }

  loadAlertsTab(event) {
    this.router.navigate(['/user-board/user-board/alerts'],  { queryParams: { connectionUserId: this.connectionUserId }} );
    event.preventDefault();
    // this.router.navigate(['alerts/'],  { queryParams: { connectionUserId: this.connectionUserId }});
  }
}
