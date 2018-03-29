import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMapComponent } from './components/dashboard-map/dashboard-map.component';
import { DashboardFormComponent } from './components/dashboard-form/dashboard-form.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule
  ],
  declarations: [DashboardMapComponent, DashboardFormComponent],
  exports: [DashboardMapComponent, DashboardFormComponent],
})
export class DashboardModule { }
