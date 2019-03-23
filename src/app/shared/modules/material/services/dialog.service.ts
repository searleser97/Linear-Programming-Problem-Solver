import {Injectable} from '@angular/core';
import {ErrorDialogComponent} from '../components/error-dialog/error-dialog.component';
import {ConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {MessageDialogComponent} from '../components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog, private router: Router) {
  }

  messageDialog(title: string, content: string, ok: string, actionAfter?: string) {
    this.matDialog.open(MessageDialogComponent, {
      data: {
        title,
        content,
        ok
      }
    }).afterClosed().subscribe(result => {
      if (result === 'ok' && actionAfter && actionAfter !== '') {
        this.router.navigate([actionAfter]);
      }
    });
  }

  errorDialog(title: string, content: string, ok: string, actionAfter?: string) {
    this.matDialog.open(ErrorDialogComponent, {
      data: {
        title,
        content,
        ok
      }
    }).afterClosed().subscribe(result => {
      if (result === 'ok' && actionAfter) {
        this.router.navigate([actionAfter]);
      }
    });
  }

  confirmDialog(title: string, content: string, ok: string, cancel: string, invertBtns?: boolean, actionAfter?: string) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title,
        content,
        ok,
        cancel,
        invertBtns
      }
    }).afterClosed().subscribe(result => {
      if (result === 'ok' && actionAfter) {
        this.router.navigate([actionAfter]);
      }
    });
  }

  simpleConfirmDialog(title: string, content: string, ok: string, cancel: string, invertBtns?: boolean) {
    return this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title,
        content,
        ok,
        cancel,
        invertBtns
      }
    });
  }

  cancelDialog(actionAfter: string) {
    this.confirmDialog('Confirmación', '¿Está seguro que desea cancelar? Se perderán todos los avances sin guardar.', 'Si', 'No',
      true, actionAfter);
  }
}
