import { Component, Input, OnInit,
  trigger, state, animate, transition, style } from '@angular/core';
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
  @Input() dbStream: Observable<IDbStream>;
  @Input() dbElements: Observable<IDbElement[]>;

  public myForm: Observable<any>;
  public showElements = true;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.dbStream
      .combineLatest(this.dbElements)
      .map(([dbStream, dbElements]) =>
        this.fb.group({
          name: [dbStream.name],
          description: [dbStream.description],
          elements: this.fb.array(this._buildElementGroups(dbElements))
        })).do(x => console.log(x));
  }

  public toggleElements() {
    console.log('here!');
    this.showElements = !this.showElements;
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
