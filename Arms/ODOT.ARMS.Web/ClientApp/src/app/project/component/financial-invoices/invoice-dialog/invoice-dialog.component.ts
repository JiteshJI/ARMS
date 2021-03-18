import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogRef, DialogContentBase, DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';



@Component({
  template: ''
})
export class DialogEntryComponent {
  constructor(private dialogService: DialogService , private router: Router,
    private route: ActivatedRoute) {
    console.info('dialog component created');
    this.openDialog();
  }
  openDialog(): void {

    const dialogRef = this.dialogService.open({
      content: InvoiceDialogComponent,
      width: 900,
      height: 600
    });
    console.info('dialog should be open');

    dialogRef.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        console.log('action', result);
      }

      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styles: [
    `
        kendo-tabstrip {
            height: 100% !important;
        }
    `
  ],
})
export class InvoiceDialogComponent extends DialogContentBase implements OnInit {
  public activeTab$: Observable<string>;
  public activeTab: string = null;
  component: any;

  constructor(public dialog: DialogRef) {    
    super(dialog);
    console.info('dialog created');
  }

  ngOnInit(): void {
    console.info('parent');
  }

  AddEditDialogClose() {
    this.dialog.close();
  }

  AddEditDialogSave() {
    this.dialog.close();
  }


  public onTabSelect(e) {
    console.log(e);
  }

}
