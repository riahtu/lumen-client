import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IDbStream,
  IDbElement
} from '../../store';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-edit-stream',
  templateUrl: './edit-stream.component.html',
  styleUrls: ['./edit-stream.component.css']
})
export class EditStreamComponent implements OnInit {
  @Input() dbStream: Observable<IDbStream>;
  @Input() dbElements: Observable<IDbElement[]>;

  public myForm: Observable<any>;

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

  private _buildElementGroups(dbElements: IDbElement[]) {
    return dbElements.map(element =>
      this.fb.group({
        plottable: [element.plottable],
        discrete: [element.discrete],
        name: [element.name],
        units: [element.units],
        offset: [element.offset],
        scaleFactor: [element.scale_factor],
        defaultMin: [element.default_min],
        defaultMax: [element.default_max]
      }));
  }

}
