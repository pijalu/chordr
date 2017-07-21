import { Component, OnInit, ViewChild } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public isResetInfoShown = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  clearStorage() {
    console.log("Reset local storage");
    this.localStorageService.clearAll();
    this.isResetInfoShown = true;
  }

  toggleResetInfoShown() {
    this.isResetInfoShown = false;
  }
}
