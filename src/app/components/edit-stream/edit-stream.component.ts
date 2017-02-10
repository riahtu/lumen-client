import {
  Component, Input, OnInit,
  trigger, state, animate, transition, style
} from '@angular/core';
import { Observable } from 'rxjs';
/*https://github.com/yuyang041060120/ng2-validation*/
import { CustomValidators } from 'ng2-validation';

import {
  IDbStream,
  IDbElement,
  IStatusMessages
} from '../../store';

import { DbStreamService } from '../../services';

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

  @Input() messages: IStatusMessages

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

  public form: FormGroup;
  public stream: IDbStream;
  public elements: IDbElement[];
  public showElements = true;

  constructor(
    private fb: FormBuilder,
    private dbStreamService: DbStreamService
  ) { }

  ngOnInit() {}

  onSubmit(streamValues){
    this.dbStreamService.updateStream(streamValues);
  }

  public toggleElements() {
    this.showElements = !this.showElements;
  }

  // --- note: form attributes correspond to API parameters ---
  buildForm(stream: IDbStream, elements: IDbElement[]) {
    if (stream == null || elements == null) {
      return;
    }
    this.form = this.fb.group({
      name: [stream.name],
      description: [stream.description],
      id: [stream.id],
      db_elements_attributes: this.fb.array(this._buildElementGroups(elements))
    });
  }

  private _buildElementGroups(dbElements: IDbElement[]) {
    return dbElements.map(element =>
      this.fb.group({
        id: [element.id],
        plottable: [element.plottable],
        discrete: [element.discrete],
        name: [element.name, Validators.required],
        units: [element.units],
        offset: [element.offset, [Validators.required, CustomValidators.number]],
        scale_factor: [element.scale_factor, [Validators.required, CustomValidators.number]],
        default_min: [element.default_min, CustomValidators.number],
        default_max: [element.default_max, CustomValidators.number]
      }));
  }

}
