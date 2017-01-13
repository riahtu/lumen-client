import { Component, OnInit } from '@angular/core';
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

  public myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({ sku: ['1234'] })
  }

  ngOnInit() {
  }

}
