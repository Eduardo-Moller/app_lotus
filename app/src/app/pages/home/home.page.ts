import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { DepartmentsService } from '../../core/services/departments.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';

  constructor(
    private authService: AuthenticationService,
    private departmentsService: DepartmentsService,
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
    const teste = await this.departmentsService.getDepartments();
    from(teste).subscribe((data: any) => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.getUser();
  }
}
