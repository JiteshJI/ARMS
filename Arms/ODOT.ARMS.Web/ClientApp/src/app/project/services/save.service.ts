import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor() { }

  public static saveFile(response: HttpResponse<ArrayBuffer>, type: string = 'application/msword') {
    let contentDisposition = response.headers.get('Content-Disposition');
    let fileName = contentDisposition.split(';')[1].split('=')[1].replace(/"/g, '');
    let blob = new Blob([response.body], { type: type });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = fileName;
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
