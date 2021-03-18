import { Component, EventEmitter, Output} from '@angular/core';
import { SelectEvent, FileInfo, FileRestrictions } from '@progress/kendo-angular-upload'; 
import { ImageInfo } from '../../../models/image-info';


@Component({
    selector: 'img-uploader-dialog',
    templateUrl: './upload-dialog.component.html',
    styles: []
})
export class ImageUploaderDialog  {
  public opened = false;
  public src: string;
  public height: number;
  public width: number;
  @Output() public ImageUpload: EventEmitter<ImageInfo> = new EventEmitter<ImageInfo>();

  public get canInsert(): boolean {
      return !this.src;
  }

  public uploadImage(): void {
    this.ImageUpload.emit(this.imageInfo);
  }

  public get imageInfo(): ImageInfo {
      return {
          src: this.src,
          height: this.height,
          width: this.width
      };
  }

  public setImageInfo(value: ImageInfo) {
      if (value) {
          this.src = value.src;
          this.height = value.height;
          this.width = value.width;
      } else {
          this.resetData();
      }
  }

  public onSelect(ev: SelectEvent): void {
      ev.files.forEach((file: FileInfo) => {
          if (file.rawFile) {
              const reader = new FileReader();
              reader.onloadend = () => {
                  const img = new Image();
                  img.src = <string>reader.result;
                  img.onload = () => {
                      this.setImageInfo({
                          src: img.src,
                          height: img.height,
                          width: img.width
                      });
                  };
              };
              reader.readAsDataURL(file.rawFile);
          }
      });
  }

  public fileRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png']
  };

  public open(): void {
      this.opened = true;
  }

  public close(): void {
      this.opened = false;
      this.resetData();
  }

  public resetData(): void {
      this.src = null;
      this.width = null;
      this.height = null;
  }

}
