import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import {ExplorerService} from '../../explorer.service';
import {ExplorerSelectors} from '../../explorer.selectors';

@Component({
  selector: 'app-tool-tab',
  templateUrl: './tool-tab.component.html',
  styleUrls: ['./tool-tab.component.css']
})
export class ToolTabComponent implements OnInit {


  constructor(
    private explorerService: ExplorerService,
    private explorerSelectors: ExplorerSelectors
  ) { }

  ngOnInit() {
  }
}
