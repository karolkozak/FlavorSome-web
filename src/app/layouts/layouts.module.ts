import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent]
})
export class LayoutsModule { }
