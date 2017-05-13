import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import {COMPONENTS} from './components';
import {PIPES} from './pipes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    COMPONENTS,
    PIPES
  ],
  exports: [
    COMPONENTS,
    PIPES
  ]
})
export class SharedModule { }
