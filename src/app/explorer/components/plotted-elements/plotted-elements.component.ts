import { Component,Input, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { IExplorer } from '../../store';
import { IDbElement } from '../../../store/data';
import {ExplorerService} from '../../explorer.service';
@Component({
  selector: 'app-plotted-elements',
  templateUrl: './plotted-elements.component.html',
  styleUrls: ['./plotted-elements.component.css']
})
export class PlottedElementsComponent implements OnInit {
  @Input() element: IDbElement;

  constructor(
    private explorerService: ExplorerService
  ) { }

  ngOnInit() {
  }

  hideElement(){
    this.explorerService.hideElement(this.element);
  }
}
