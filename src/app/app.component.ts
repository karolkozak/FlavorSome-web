import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';
import {environment} from '@env/environment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'un';
  @ViewChild('content') content: any;
  modalRef: any;

  constructor(private customTranslateService: CustomTranslateService, private modalService: NgbModal) {
  }

  onActivate() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.customTranslateService.setTranslations();
    if (this.isQa) {
      this.showModal();
    }
  }


  showModal(): void {
    setTimeout(() => {
      this.modalRef = this.modalService.open(this.content);
    });
  }

  get isQa(): boolean {
    return environment.qa;
  }
}
