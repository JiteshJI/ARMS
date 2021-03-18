import { Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ImageUploaderDialog } from './upload-dialog/upload-dialog.component';
import { LinkDialog } from './link-dialog/link-dialog.component';
import { EditorComponent } from '@progress/kendo-angular-editor';
import { Button } from '@progress/kendo-angular-buttons';
import { ImageInfo } from '../../models/image-info';
import { ProjectAbstract } from '../../models/project-abstract';

@Component({
  selector: 'prj-abstract',
  templateUrl: './prj-abstract.component.html',
  styles: []
})

export class PrjAbstractComponent implements OnInit, AfterViewInit {

  //@Output() AbstractChange = new EventEmitter<string>();
  @Output() saveProjectAbstract = new EventEmitter<ProjectAbstract>();
  @Input() projectAbstract: ProjectAbstract;
  @ViewChild('upload') public imgDlg: ImageUploaderDialog;
  @ViewChild('link') public linkDlg: LinkDialog;
  @ViewChild('editor') public editor: EditorComponent;
  @ViewChild('fakeBtn') lnkBtn: Button;

  abstractForm: FormGroup;

  public passiveSupported: boolean = true;


  constructor(private fb: FormBuilder) {
  }

  get objectiveTxt(): FormControl { return this.abstractForm.get('objectiveTxt') as FormControl; }

  ngOnInit() {
    console.log('check abstract data', this.projectAbstract);
    this.loadAbstract();
  }

  loadAbstract() {
    if (this.projectAbstract) {
      this.abstractForm = this.fb.group({
        objectiveTxt: [this.projectAbstract.abstractTxt]
      });
    }
    else {
      this.abstractForm = this.fb.group({
        objectiveTxt: [null]
      })
    }
  }

  //ngAfterContentInit

  public ngAfterViewInit() {
    (document.querySelector("kendo-editor iframe") as HTMLIFrameElement)
      .contentDocument.addEventListener("selectionchange", (ev: Event) => {
        var dom = <Document>ev.target;
        if (dom.getSelection().toString().length > 0) {
          this.lnkBtn.disabled = false;
        }
        else {
          this.lnkBtn.disabled = true;
        }
      }, this.passiveSupported
        ? { passive: true } : false);
  }

  public save() {
    const projectAbstract: ProjectAbstract = new ProjectAbstract();
    projectAbstract.projId = this.projectAbstract.projId;
    projectAbstract.projectAltId = this.projectAbstract.projectAltId;
    projectAbstract.abstractTxt = this.objectiveTxt.value;
    projectAbstract.userId = this.projectAbstract.userId;
    this.saveProjectAbstract.emit(projectAbstract);
  }

  public cancel() {
    // revert abstract to initial;
    this.loadAbstract();
  }

  public imageUploader(img: ImageInfo) {
    this.editor.exec('insertImage', img);
    this.imgDlg.close();
  }

  public createLink(lnk: any) {
    this.editor.exec('createLink', { href: lnk.url, title: lnk.urlTitle, target: ((lnk.newWindow) ? '_blank' : 'window') });
    this.linkDlg.close();
  }

  public removeImage() {
    //this.RemoveImage.emit();
  }
}
