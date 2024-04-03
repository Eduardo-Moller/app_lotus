import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccompanyPage } from './accompany.page';

const routes: Routes = [
  {
    path: '',
    component: AccompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccompanyPageRoutingModule {}
