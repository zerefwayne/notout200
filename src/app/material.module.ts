import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatSelectModule} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule
  ]
})

export class MaterialModule { }
