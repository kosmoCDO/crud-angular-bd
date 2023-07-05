import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'shared-modal-confirm',
    templateUrl: 'modal-confirm.component.html',
    styleUrls: ['modal-confirm.component.css']
})

export class ModalConfirmComponent  {
    constructor(
        public dialogRef: MatDialogRef<ModalConfirmComponent>,
        @Inject( MAT_DIALOG_DATA ) public data: string
    ) { }


    @ViewChild('password')
    public passwordField!: ElementRef<HTMLInputElement>; 


    public onCloseModal():void {
        this.dialogRef.close(false);
        return;
    }

    public onAccept():void {
        const confirmPass = this.passwordField.nativeElement.value;
        this.dialogRef.close(confirmPass)
    }

}