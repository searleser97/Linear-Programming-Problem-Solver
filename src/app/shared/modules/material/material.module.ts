import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSlideToggleModule, MatPaginatorModule, MatProgressBarModule,
  MatStepperModule
} from '@angular/material';

import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {ErrorDialogComponent} from './components/error-dialog/error-dialog.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

@NgModule({
  exports: [
    CommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatRippleModule,
    MatTableModule,
    NgxMatSelectSearchModule,
    MatSortModule,
    MatDialogModule,
    MatSlideToggleModule,
    ConfirmDialogComponent,
    MatPaginatorModule,
    MatProgressBarModule,
    MatStepperModule
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatRippleModule,
    MatTableModule,
    NgxMatSelectSearchModule,
    MatSortModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  declarations: [ConfirmDialogComponent, ErrorDialogComponent, MessageDialogComponent],
  entryComponents: [
    ConfirmDialogComponent,
    ErrorDialogComponent,
    MessageDialogComponent
  ]
})
export class MaterialModule {
}
