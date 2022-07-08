import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';





@NgModule({
  declarations: [
    ErrorDialogComponent,
    FieldErrorDisplayComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    FieldErrorDisplayComponent
  ]
})
export class SharedModule { }
