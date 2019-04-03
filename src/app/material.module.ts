import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})

export class MaterialModule { }
