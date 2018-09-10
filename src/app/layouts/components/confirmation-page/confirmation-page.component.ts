import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CustomAuthService} from '@app/security/services/custom-auth.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';

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
              private customToastrService: CustomToastrService) {
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
      this.customToastrService.showSuccessToastr('Success', 'Confirmation successful');
      this.router.navigate(['']);
    }, () => {
      this.confirmationError = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
