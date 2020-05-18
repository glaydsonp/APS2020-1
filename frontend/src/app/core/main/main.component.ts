import { Component, OnInit } from '@angular/core';
import { Router, NavigationError, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  loading: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private idleService: BnNgIdleService
  ) {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.loading = false;
          }, 500);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.idleService.startWatching(30).subscribe((isUserInactive) => {

      if (isUserInactive) {

        // console.log('Session expired...');

        const currentRoute = this.router.url;

        if(currentRoute !== '/login' && currentRoute !== '/register'
           && currentRoute !== '/forgot-password' ) {

          // console.log('Redirecting to login screen...')

          this.authService.logout();
          this.idleService.resetTimer();

        }

      }

    });

  }

}
