import { Directive, Input, OnInit } from '@angular/core';
import { PopupComponent, Align } from '@progress/kendo-angular-popup';
import { ColumnComponent } from '@progress/kendo-angular-grid';

@Directive({
  selector: '[appErrorPopupInGrid]'
})
export class ErrorPopupInGridDirective implements OnInit {

  @Input() currentRowIndex: number = -1;

  @Input() totalRowCount: number;

  @Input() isLastColumn: boolean = false;

  private anchorAlignBottom: Align = { horizontal: "left", vertical: "bottom" };
  private popupAlignBottom: Align = { horizontal: "left", vertical: "top" };

  private anchorAlignTop: Align = { horizontal: "left", vertical: "top" };
  private popupAlignTop: Align = { horizontal: "left", vertical: "bottom" };

  private anchorAlignRight: Align = { horizontal: "right", vertical: "center" };
  private popupAlignRight: Align = { horizontal: "left", vertical: "center" };

  private anchorAlignLeft: Align = { horizontal: "left", vertical: "center" };
  private popupAlignLeft: Align = { horizontal: "right", vertical: "center" };

  constructor(private errorPopupComponent: PopupComponent) {
  }

  ngOnInit() {
    /* If the first row is edited in the grid, then always show the error popup to the bottom of the anchor */
    if (this.currentRowIndex == -1) {
      this.errorPopupComponent.anchorAlign = this.anchorAlignBottom;
      this.errorPopupComponent.popupAlign = this.popupAlignBottom;
    }
    /* If there is only one row in the grid and if the user is editing it, showing the error on top or bottom will not work
     * so show the error message to the right for every column except the last column where we show it to the left..
     * Below 2 else if statement take care of this logic */
    else if (((this.currentRowIndex + 1) == this.totalRowCount) && this.totalRowCount == 1 && this.isLastColumn) {
      this.errorPopupComponent.anchorAlign = this.anchorAlignLeft;
      this.errorPopupComponent.popupAlign = this.popupAlignLeft;
    }
    else if (((this.currentRowIndex + 1) == this.totalRowCount) && this.totalRowCount == 1) {
      this.errorPopupComponent.anchorAlign = this.anchorAlignRight;
      this.errorPopupComponent.popupAlign = this.popupAlignRight;
    }
    /* If we reach this statement then the last row is being editing, show the error message popup to the top of the anchor */
    else if ((this.currentRowIndex + 1) == this.totalRowCount) {
      this.errorPopupComponent.anchorAlign = this.anchorAlignTop;
      this.errorPopupComponent.popupAlign = this.popupAlignTop;
    }
  }

}
