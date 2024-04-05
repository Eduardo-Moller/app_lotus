import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accompany',
  templateUrl: './accompany.page.html',
  styleUrls: ['./accompany.page.scss'],
})
export class AccompanyPage implements OnInit {
  constructor(private router: Router) {}

  async navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnInit() {}
}
