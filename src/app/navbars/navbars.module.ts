import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {HeaderComponent} from '@app/navbars/components/header/header.component';
import {FooterComponent} from '@app/navbars/components/footer/footer.component';
import {LanguageChooserComponent} from '@app/navbars/components/language-chooser/language-chooser.component';

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
