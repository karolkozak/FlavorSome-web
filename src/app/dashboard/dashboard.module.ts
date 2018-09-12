import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import {SharedModule} from '@app/shared/shared.module';
import { DashboardMapComponent } from './components/dashboard-map/dashboard-map.component';
import { DashboardFormComponent } from './components/dashboard-form/dashboard-form.component';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    DashboardMapComponent,
    DashboardFormComponent
  ],
  exports: [
    DashboardMapComponent,
    DashboardFormComponent
  ],
  providers: [PlacesSearchService]
})
export class DashboardModule { }
