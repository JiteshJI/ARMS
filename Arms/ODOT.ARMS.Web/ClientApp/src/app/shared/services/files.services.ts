import {  ViewChild, ViewContainerRef, Injectable } from '@angular/core'
@Injectable({
  providedIn: 'root'
})
export class fileservice {
  constructor() { }
  public GetFileByExtension(fileExtension): string {
    var extWithoutDot = fileExtension.toUpperCase();
    var IconList = {
      DOC: "k-icon k-i-file-word k-icon-32",
      DOCM: "k-icon k-i-file-word k-icon-32",
      DOCX: "k-icon k-i-file-word k-icon-32 k-word",
      PDF: "k-icon k-i-file-pdf k-icon-32 k-pdf",
      XLSM: "k-icon k-i-file-excel k-icon-32 k-excel",
      XLSX: "k-icon k-i-file-excel k-icon-32 k-excel",
      XLS: "k-icon k-i-file-excel k-icon-32 k-excel",
      CSV: "k-icon k-i-file-csv k-icon-32",
      PPTX: "k-icon k-i-file-ppt k-icon-32",
      TXT: "k-icon .k-i-file-txt k-icon-32",
    };
    return IconList[extWithoutDot] == null ? 'k-icon k-i-file k-icon-32' : IconList[extWithoutDot];
  }
}
