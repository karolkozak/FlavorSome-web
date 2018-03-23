import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {LanguageChooserComponent} from './components/language-chooser/language-chooser.component';
import {FooterComponent} from './components/footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [HeaderComponent, FooterComponent, LanguageChooserComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class NavbarsModule {
}
