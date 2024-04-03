import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestRegisterPage } from './request-register.page';

const routes: Routes = [
  {
    path: '',
    component: RequestRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRegisterPageRoutingModule {}
