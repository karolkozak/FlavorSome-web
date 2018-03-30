import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {LanguageChooserComponent} from './components/language-chooser/language-chooser.component';
import {SharedModule} from '@app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [HeaderComponent, FooterComponent, LanguageChooserComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class NavbarsModule {
}
