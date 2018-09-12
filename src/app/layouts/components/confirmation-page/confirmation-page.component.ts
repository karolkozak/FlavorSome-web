import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CustomAuthService} from '@app/security/services/custom-auth.service';
import {ToastrService} from 'ngx-toastr';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';

@Component({
  selector: 'un-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  confirmationToken: string;
  confirmationError = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customAuthService: CustomAuthService,
              private toastr: ToastrService, private customTranslateService: CustomTranslateService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(queryParams => {
      this.confirmationToken = queryParams['token'];
      if (this.confirmationToken) {
        this.confirmUserRegistration(this.confirmationToken);
      }
    });
  }

  confirmUserRegistration(token: string) {
    this.customAuthService.confirmRegistration(token).subscribe(() => {
      let title = '', message = '';
      this.customTranslateService.getTranslation('Success').subscribe(result => title = result);
      this.customTranslateService
        .getTranslation('Confirmation successful')
        .subscribe(result => message = result);
      this.toastr.success(message, title);
      this.router.navigate(['/dashboard']);
    }, () => {
      this.confirmationError = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
