import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';
  departmentName: string = 'SEM DEPARTAMENTO';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  async navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async getUser() {
    const user = await this.authService.getUser();
    if (!user) this.logout();
    this.userName = user.name;
    if (user.department) this.departmentName = user.department;
  }

  ngOnInit() {
    this.getUser();
  }
}
