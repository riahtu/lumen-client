import { 
  Component, 
  Input, 
  ViewChild, 
  OnInit, 
  OnChanges,
  ElementRef, 
  AfterViewInit,
  SimpleChanges
} from '@angular/core';
import { select } from 'ng2-redux';
import { Subject, Observable, Subscription } from 'rxjs';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { IExplorer } from '../../store';
import { DbElementService } from '../../../services';
import { IDbElement } from '../../../store/data';
import { ExplorerService } from '../../explorer.service';
declare var $: any;

@Component({
  selector: 'app-plotted-elements',
  templateUrl: './plotted-elements.component.html',
  styleUrls: ['./plotted-elements.component.css']
})
export class PlottedElementsComponent 
  implements OnInit, OnChanges, AfterViewInit {
  @Input() element: IDbElement;
  @Input() axis: string;

  @ViewChild('elementModal') public elementModal: ModalDirective;
  @ViewChild('colorPicker') colorPicker: ElementRef

  private displayName: string;

  //--state for customization modal--
  private newColor: string;
  private newAxis: string;
  private newName: string;
  private axisMessage: string;
  private axisOptions = [
    { value: 'left', label: 'left side' },
    { value: 'right', label: 'right side' }];
  //----------------------------------

  constructor(
    private explorerService: ExplorerService,
    private dbElementService: DbElementService
  ) {
    this.newColor = "";
  }

  ngOnInit() {
    this.newColor = this.element.color;
  }
  ngOnChanges(changes: SimpleChanges){
    if(this.element.display_name!=""){
      this.displayName = this.element.display_name;
    } else {
      this.displayName = this.element.name;
    }
  }
  // X button on the element display
  hideElement() {
    this.explorerService.hideElement(this.element);
  }

  // ---- code to handle element customization modal ----
  //
  ngAfterViewInit() {
    //configure jQuery minicolor
    $(this.colorPicker.nativeElement).minicolors({
      theme: 'bootstrap',
      letterCase: 'uppercase',
      changeDelay: 100,
      change: (value, opacity) => { this.newColor = value }
    });
  }
  showModal() {
    //reset modal properties
    this.newColor = this.element.color;
    $(this.colorPicker.nativeElement).minicolors('value',
      {color: this.element.color, opacity: 1.0})
    this.newName = this.element.display_name;
    this.newAxis = this.axis;
    this.axisMessage = "";
    this.elementModal.show();
  }
  // modify the element if the user clicks 'save'
  onSave() {
    //check if the axis changed
    if (this.axis != this.newAxis) {
      let result = this.explorerService.setElementAxis(this.element, this.newAxis);
      if (result == false) {
        this.axisMessage = `this axis does not have units [ ${this.element.units} ]`
        return; //do not close the dialog
      }
    }
    //check if the color changed
    if (this.newColor != null && this.newColor != "" &&
      this.newColor != this.element.color)
      this.dbElementService.setColor(this.element, this.newColor);
    //check if the display name changed
    if (this.element.display_name != this.newName)
      this.dbElementService.setDisplayName(this.element, this.newName);
    //changes succesfully processed, close the modal
    this.elementModal.hide();
  }
}
