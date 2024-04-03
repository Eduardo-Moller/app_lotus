import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccompanyPageRoutingModule } from './accompany-routing.module';

import { AccompanyPage } from './accompany.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccompanyPageRoutingModule],
  declarations: [AccompanyPage],
})
export class AccompanyPageModule {}
