import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() savePlotImage: EventEmitter<string>;
  @Output() saveDataView: EventEmitter<string>;
  @Output() loadDataView: EventEmitter<string>;

  constructor(
    public explorerService: ExplorerService,
    public explorerSelectors: ExplorerSelectors
  ) { 
    this.savePlotImage = new EventEmitter();
    this.saveDataView = new EventEmitter();
    this.loadDataView = new EventEmitter();
  }

  ngOnInit() {
  }

  showSaveDataView(){

  }
}
