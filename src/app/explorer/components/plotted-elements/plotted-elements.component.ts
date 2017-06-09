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
import { select } from '@angular-redux/store';
import { Subject, Observable, Subscription } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IExplorer } from '../../store';
import { DbElementService } from '../../../services';
import { IDbElement } from '../../../store/data';
import { ExplorerService } from '../../explorer.service';
import { ExplorerSelectors } from '../../explorer.selectors';

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

  public displayName: string;
  public toolTipText$: Observable<string>;
  public elementInfo$: Observable<IElementInfo>;

  //--state for customization modal--
  public newColor: string;
  public newAxis: string;
  public newName: string;
  public axisMessage: string;
  public axisOptions = [
    { value: 'left', label: 'left side' },
    { value: 'right', label: 'right side' }];
  //----------------------------------

  constructor(
    private explorerService: ExplorerService,
    private dbElementService: DbElementService,
    private explorerSelectors: ExplorerSelectors
  ) {
    this.newColor = "";
  }

  ngOnInit() {
    this.newColor = this.element.color;

    //create tooltip text as [stream_name] @ [installation_name]
    //
    this.toolTipText$ = this.explorerSelectors.streams$
      .combineLatest(this.explorerSelectors.nilms$)
      .map(([streams, nilms]) => {
        if (streams[this.element.db_stream_id] === undefined)
          return '<unknown>'
        let myStream = streams[this.element.db_stream_id]
        if (nilms[myStream.nilm_id] === undefined)
          return null;
        let myNilm = nilms[myStream.nilm_id]
        return `${myStream.name} @ ${myNilm.name}`
      })

    //element info 
    //
    this.elementInfo$ = this.explorerSelectors.streams$
      .combineLatest(this.explorerSelectors.nilms$)
      .map(([streams, nilms]) => {
        if (streams[this.element.db_stream_id] === undefined)
          return {};
        let myStream = streams[this.element.db_stream_id]
        if (nilms[myStream.nilm_id] === undefined)
          return {};
        let myNilm = nilms[myStream.nilm_id]
        return {
          stream_name: myStream.name,
          installation_name: myNilm.name,
          path: myStream.path,
          installation_url: myNilm.url
        }
      })
      .filter(info => info!=null)

  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.element.display_name != "") {
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
      { color: this.element.color, opacity: 1.0 })
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

export interface IElementInfo {
  stream_name: string,
  installation_name: string,
  path: string,
  installation_url: string
}
