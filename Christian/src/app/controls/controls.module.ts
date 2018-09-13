import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//External imports

//Components
import { CtTableComponent } from './ct-table/ct-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CtTableComponent],
  exports: [CtTableComponent]
})
export class ControlsModule { }
