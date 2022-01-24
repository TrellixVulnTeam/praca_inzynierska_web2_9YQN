import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmYesNoDialogModel } from './models/confirm-yes-no-dialog-model';

@Component({
  selector: 'app-confirm-yes-no-dialog',
  templateUrl: './confirm-yes-no-dialog.component.html',
  styleUrls: ['./confirm-yes-no-dialog.component.css']
})
export class ConfirmYesNoDialogComponent implements OnInit {
  title: string = "";
  message: string = "";

  public constructor(
    public dialogRef: MatDialogRef<ConfirmYesNoDialogModel>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmYesNoDialogModel,
    public dialog: MatDialog) {
    this.title = data.title;
    this.message = data.message;
  }
  
  ngOnInit(): void {
  }

  
  onAccept(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
