import { SessionService } from 'src/app/core/services/session.service';
import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ISession } from '../../data/api/session/session';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  username: string;
  session$: Observable<ISession>;
  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.session$ = this.sessionService.session$;
  }

  ngOnInit() { }

  logout() {
    this.authService.logout();
  }
}
