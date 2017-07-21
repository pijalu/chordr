import { Component, OnInit, Input } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

class Status {
  constructor(public dismissed: boolean) { }
}

@Component({
  selector: 'app-dismissable-alert',
  templateUrl: './dismissable-alert.component.html',
  styleUrls: ['./dismissable-alert.component.css']
})
export class DismissableAlertComponent implements OnInit {
  @Input() key: string;
  @Input() title: string;
  @Input() text: string;

  status: Status;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.status = this.localStorageService.get('alert_' + this.key);
    if (this.status === null) {
      this.status = new Status(false);
    }
  }

  dismiss() {
    this.status.dismissed = true;
    this.localStorageService.set('alert_' + this.key, this.status);
  }
}
