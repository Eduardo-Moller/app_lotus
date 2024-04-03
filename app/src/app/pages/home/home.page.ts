import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  async navigateTo(route: string) {
    await this.authService.logout();
    this.router.navigateByUrl(route, { replaceUrl: true });
  }

  ngOnInit() {}
}
