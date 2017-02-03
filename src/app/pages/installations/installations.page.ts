import { Component, OnInit } from '@angular/core';

import {
  InstallationsSelectors,
  InstallationsService
} from '../../services';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.page.html',
  styleUrls: ['./installations.page.css']
})
export class InstallationsPageComponent implements OnInit {

  constructor(
    private installationsService: InstallationsService,
    private installationsSelectors: InstallationsSelectors
  ) { }

  ngOnInit() {
    this.installationsService.loadNilms();
  }

}
