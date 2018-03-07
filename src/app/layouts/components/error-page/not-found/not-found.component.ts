import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'un-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public router: Router;

  constructor(private _router: Router) {
    this.router = _router;
  }

  ngOnInit() {
  }

}
