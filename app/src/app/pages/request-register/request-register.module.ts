import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestRegisterPageRoutingModule } from './request-register-routing.module';

import { RequestRegisterPage } from './request-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestRegisterPageRoutingModule
  ],
  declarations: [RequestRegisterPage]
})
export class RequestRegisterPageModule {}
