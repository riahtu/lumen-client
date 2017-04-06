import { Component, Input, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Subject, Observable, Subscription} from 'rxjs';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { IExplorer} from '../../store';
import { DbElementService } from '../../../services';
import { IDbElement } from '../../../store/data';
import { ExplorerService } from '../../explorer.service';
declare var $: any;

@Component({
  selector: 'app-plotted-elements',
  templateUrl: './plotted-elements.component.html',
  styleUrls: ['./plotted-elements.component.css']
})
export class PlottedElementsComponent implements OnInit, AfterViewInit{
  @Input() element: IDbElement;
  @ViewChild('elementModal') public elementModal: ModalDirective;
  @ViewChild('colorPicker') colorPicker: ElementRef

  private newColor: string;

  constructor(
    private explorerService: ExplorerService,
    private dbElementService: DbElementService
  ) {
    this.newColor = "";
  }

  ngOnInit(){
    this.newColor = this.element.color;
  }
  ngAfterViewInit(){
    $(this.colorPicker.nativeElement).minicolors({
      theme: 'bootstrap',
      letterCase: 'uppercase',
      changeDelay: 100,
      change: (value, opacity) => {this.newColor = value}
    });
  }

  onSave(){
    //check if the color changed
    if(this.newColor!=null && this.newColor!="" && 
      this.newColor != this.element.color)
      this.dbElementService.setColor(this.element, this.newColor);
    //check if the display name changed
    //check if the axis changed
    this.elementModal.hide();
  }

  hideElement() {
    this.explorerService.hideElement(this.element);
  }
  setColor(color, element: IDbElement) {
    console.log(element.name, color);
  }
}
