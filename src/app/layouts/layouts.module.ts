import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent]
})
export class LayoutsModule { }
