import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  invertBtns = false;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.invertBtns = data.invertBtns;
  }

  onConfirm() {
    this.dialogRef.close('ok');
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }

  ngOnInit() {
  }

}

export interface DialogData {
  title: string;
  content: string;
  ok: string;
  cancel: string;
  invertBtns: boolean;
}
