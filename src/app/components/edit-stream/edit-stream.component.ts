import {
  Component, Input, OnInit,
  trigger, state, animate, transition, style
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  IDbStream,
  IDbElement
} from '../../store';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-edit-stream',
  templateUrl: './edit-stream.component.html',
  animations: [
    trigger('elementsToggled', [
      state('true', style({ height: '*', opacity: 1 })),
      state('false', style({ height: '0px', opacity: 0 })),
      transition('* => *', animate('.5s ease-in'))
    ])
  ],
  styleUrls: ['./edit-stream.component.css']
})
export class EditStreamComponent implements OnInit {

  public form: FormGroup;
  public stream: IDbStream;
  public elements: IDbElement[];
  public showElements = true;

  @Input()
  public set dbStream(val: IDbStream) {
    this.stream = val;
    this.buildForm(this.stream, this.elements);
  }
  @Input()
  public set dbElements(val: IDbElement[]) {
    this.elements = val
    this.buildForm(this.stream, this.elements)
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {}

  public toggleElements() {
    this.showElements = !this.showElements;
  }

  buildForm(stream: IDbStream, elements: IDbElement[]) {
    if (stream == null || elements == null) {
      return;
    }
    this.form = this.fb.group({
      name: [stream.name],
      description: [stream.description],
      elements: this.fb.array(this._buildElementGroups(elements))
    });
  }

  private _buildElementGroups(dbElements: IDbElement[]) {
    return dbElements.map(element =>
      this.fb.group({
        plottable: [element.plottable],
        discrete: [element.discrete],
        name: [element.name, Validators.required],
        units: [element.units],
        offset: [element.offset],
        scaleFactor: [element.scale_factor],
        defaultMin: [element.default_min],
        defaultMax: [element.default_max]
      }));
  }

}
