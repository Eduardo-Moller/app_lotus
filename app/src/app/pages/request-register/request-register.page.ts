import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-register',
  templateUrl: './request-register.page.html',
  styleUrls: ['./request-register.page.scss'],
})
export class RequestRegisterPage implements OnInit {
  constructor(private router: Router) {}

  async navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnInit() {}
}
