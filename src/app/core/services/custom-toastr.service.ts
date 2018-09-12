import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';

@Injectable()
export class CustomToastrService {
  constructor(private toastr: ToastrService, private customTranslateService: CustomTranslateService) {
  }

  showSuccessToastr(titleKey: string, messageKey: string) {
    let title = '', message = '';
    this.customTranslateService.getTranslation(titleKey).subscribe(result => title = result);
    this.customTranslateService.getTranslation(messageKey).subscribe(result => message = result);
    this.toastr.success(message, title);
  }

  showErrorToastr(titleKey: string, messageKey: string, status?: number) {
    let title = '', message = '';
    this.customTranslateService.getTranslation(titleKey).subscribe(result => title = result);
    this.customTranslateService.getTranslation(messageKey)
      .subscribe(result => message = result);
    title = status ? `${title} - ${status}` : title;
    this.toastr.error(message, title);
  }
}
