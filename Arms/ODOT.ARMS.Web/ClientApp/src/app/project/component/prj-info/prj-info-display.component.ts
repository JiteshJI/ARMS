import { Component, Input, OnInit, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgencyDetailModel } from 'src/app/agency/models/agencydetails.module';
import { GenericLookupListForDD, WarehouseData } from '../../models/project-for-update';
import { ProjectTypesEnum } from '../../models/project-header';
import { ProjectInfo, ProjectTypeList, ProjectStatusEnum } from '../../models/projectInfo';
import { Item } from '../../models/projects';
import { ValidateFields } from '../../../shared/validators/Values.validator';
import { ProjectService } from '../../services/project.service';
import { Deliverable } from '../../models/custom-deliverable';

@Component({
  selector: 'app-prj-info',
  templateUrl: './prj-info-display.component.html'
})

export class PrjInfoFormComponent implements OnInit, OnChanges {

  constructor(private fb: FormBuilder, private projectService: ProjectService, private validateFields: ValidateFields) {
  }

  @Input() projectInfo: ProjectInfo;
  @Input() projectTypeId: string;
  @Input() projectTypes: GenericLookupListForDD[];
  @Input() projectStatus: GenericLookupListForDD[];
  @Input() researchAgencies: AgencyDetailModel[];
  @Input() addressCodes: string[];
  @Input() warehouseInfo: WarehouseData;
  @Input() allDeliverables: Deliverable[];
  @Input() editedDeliverable: Deliverable;
  @Output() saveProjInfo = new EventEmitter<ProjectInfo>();
  @Output() getVendorInfo = new EventEmitter<string>();
  @Output() getPidInfo = new EventEmitter<number>();
  @Input() isNew: boolean;
  public maxChars = 255;
  public prjType: string;
  public propFiscalYr: number;
  public prjInfoForm: FormGroup;
  public disableImplementedStatus: boolean;
  public disableStandardDeliverable: boolean;
  public formatOptions: any = {
    maximumFractionDigits: 0,
    useGrouping: false
  };
  public statusInd: Array<Item> = [
    { text: 'Yes', value: 'Y' },
    { text: 'No', value: 'N' }
  ];
  public TPFNumberMask = 'TPF-0(999)';
  ngOnInit(): void {
    console.log('Loading the prj-info display component');
    console.log(this.projectInfo);
    this.formIntializer();
    if (this.isNew) {
      this.setProjectStatus(ProjectStatusEnum.Proposed);
    }
    if (this.projectInfo) {
      this.prjInfoForm.patchValue(this.projectInfo);
      this.setPropFiscalYr(+this.projectInfo.propFiscalYr);
      this.checkProjectStatus(this.projectInfo.projectStatusId);
    }
    this.populateClassificationName();
    this.populateVendorTxt();
    this.projtypesArray();
    this.populateDuration();
    this.setDisabledProperties();

    this.prjInfoForm.get('propFiscalYr').markAsTouched();
    this.prjInfoForm.get('projectTitleTxt').markAsTouched();
    this.prjInfoForm.get('rfpNum').markAsTouched();
    this.prjInfoForm.get('projectStatusId').markAsTouched();
    this.prjInfoForm.get('projectTypeNbr').markAsTouched();
    console.log(this.prjInfoForm.value);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['warehouseInfo'] && this.warehouseInfo) {
      this.setPidNum(this.warehouseInfo.pidNumber);
      this.setAgreementNum(this.warehouseInfo.agreementNumber);
      this.setFedAuthNum(this.warehouseInfo.fanNumber);
      this.setStateJobNum(this.warehouseInfo.stateJobNumber);
    }
  }

  save() {
    if (this.isNew) {
      this.setProjectClassificationId(this.projectTypeId);
    }
    const prjInfo: ProjectInfo = this.prjInfoForm.value;
    this.prjInfoForm.markAsPristine();
    this.saveProjInfo.emit(prjInfo);
  }


  populateVendorTxt() {
    this.prjInfoForm.get('agencyId').valueChanges.subscribe(selectagencyId => {
      if (selectagencyId) {
        const agencies = this.researchAgencies.find(agency => agency.agencyId === selectagencyId);
        this.prjInfoForm.get('vendorIdTxt').setValue(agencies.vendorId);
        this.getVendorInfo.emit(agencies.vendorId);
      }
    });
  }

  populateDuration() {
    this.prjInfoForm.get('contractStartDt').valueChanges.subscribe(date => {
      this.setProjDuration(this.projectService.monthDiff(date, this.prjInfoForm.get('contractEndDt').value));
    });
    this.prjInfoForm.get('contractEndDt').valueChanges.subscribe(date => {
      this.setProjDuration(this.projectService.monthDiff(this.prjInfoForm.get('contractStartDt').value, date));
    });
  }
  /*
    // use this when watching two form values to set a third form value.
   // updateProjectDuration() {
   //   combineLatest([
   //     this.prjInfoForm.get('contractStartDt').valueChanges,
   //     this.prjInfoForm.get('contractEndDt').valueChanges
    //  ])
    //  .pipe(map(([contractStartDt, contractEndtDt]) => this.monthDiff(contractStartDt, contractEndtDt)),
     //        tap((number) => console.log('the number is ' + number))
     //       )
     //   .subscribe(([contractStartDt, contractEndtDt]) => {
     //     console.log(contractEndtDt, contractStartDt);
     //     this.setProjDuration(this.monthDiff(contractStartDt, contractEndtDt));
     //   });
   // }
  */
  handleProjTypeChange(prjtype: any[]) {
    /*
    const projtype: ProjectTypeList[] = [];
    prjtype.forEach(type => {
      projtype.push(new ProjectTypeList(type.toString()));
    });
    console.log(projtype);
    */

    /* Replaced the above code with  Map instead of foreach to readability */
    const projectTyp: ProjectTypeList[] = prjtype.map(type => new ProjectTypeList(type.toString()));
    this.setProjTypeList(projectTyp);
  }

  public projtypesArray() {
    if (!this.isNew) {
      const projTyp: Number[] = this.projectInfo.projectTypeList.map(type => +type.projectTypeId);
      this.setProjTypeNbr(projTyp);
    }
  }


  public pidInfo() {
    const pidNumber = this.prjInfoForm.get('pidNum').value;
    if (pidNumber) {
      this.getPidInfo.emit(pidNumber);
    }
  }

  public charCheck(ev): Boolean {
    const c = String.fromCharCode(ev.keyCode);
    return this.projectService.isValid(c);
  }

  public populateClassificationName() {
    debugger;
    if (this.isNew) {
      return this.getPrjType(this.projectTypeId);
    } else {
      return this.getPrjType(this.prjInfoForm.get('projectClassificationId').value);
    }
  }

  setDisabledProperties() {
    this.prjInfoForm.get('projectStatusId').valueChanges.subscribe(statusId => {
      this.checkProjectStatus(statusId);
    });
  }

  /** Helper Functions for patching the form */
  getPrjType = (ProjectClassification: string) => ProjectTypesEnum[+ProjectClassification];
  setPropFiscalYr = (fy: number) => this.prjInfoForm.patchValue({ propFiscalYr: fy });
  setProjectClassificationId = (typeId: string) => this.prjInfoForm.patchValue({ projectClassificationId: typeId });
  setProjTypeList = (projType: ProjectTypeList[]) => this.prjInfoForm.patchValue({ projectTypeList: projType });
  setProjDuration = (duration: number) => this.prjInfoForm.patchValue({ projectDuration: duration });
  setProjTypeNbr = (types: Number[]) => this.prjInfoForm.patchValue({ projectTypeNbr: types });
  setPidNum = (pidNumber: number) => this.prjInfoForm.patchValue({ pidNum: pidNumber });
  setAgreementNum = (agreementNumber: string) => this.prjInfoForm.patchValue({ agreementNum: agreementNumber });
  setFedAuthNum = (fanNumber: string) => this.prjInfoForm.patchValue({ fedAuthNum: fanNumber });
  setStateJobNum = (stateJobNumber: string) => this.prjInfoForm.patchValue({ stateJobNum: stateJobNumber });
  setImpStatusInd = (value: any) => this.prjInfoForm.patchValue({ impStatusInd: value });
  setStandardDeliverableInd = (value: any) => this.prjInfoForm.patchValue({ standardDeliverableInd: value });
  setProjectStatus = (projStatus: number) => this.prjInfoForm.patchValue({ projectStatusId: projStatus });

  private checkProjectStatus(statusId: any) {
    this.disableImplementedStatus = this.projectService.disableImplStatus(statusId);
    this.disableStandardDeliverable = this.projectService.disableStdDeliverableStatus(statusId);
  }

  public formIntializer() {
    this.prjInfoForm = this.fb.group({
      projectAltId: [''],
      projectClassificationId: [''],
      projectStatusId: [''],
      projectTitleTxt: ['', [Validators.required]],
      rfpNum: ['', {
        updateOn: 'blur',
        validators: [Validators.required],
        asyncValidators: [this.validateFields.validateValues('RFP', this.isNew)]
      }],
      ideaNum: ['', {
        updateOn: 'blur',
        asyncValidators: [this.validateFields.validateValues('IdeaNumber', this.isNew)]
      }],
      fedAuthNum: ['', {
        updateOn: 'blur',
        asyncValidators: [this.validateFields.validateValues('FAN', this.isNew)]
      }],
      stateJobNum: ['', {
        updateOn: 'blur',
        asyncValidators: [this.validateFields.validateValues('SJN', this.isNew)]
      }],
      agreementNum: ['', {
        updateOn: 'blur',
        asyncValidators: [this.validateFields.validateValues('AgreementNumber', this.isNew)]
      }],
      pidNum: ['', {
        updateOn: 'blur',
        asyncValidators: [this.validateFields.validateValues('PID', this.isNew)]
      }],
      propFiscalYr: ['', [Validators.required]],
      tpfNum: ['', {
        updateOn: 'blur',
        asyncValidators: [this.validateFields.validateValues('TPF', this.isNew)]
      }],
      contractStartDt: [''],
      contractEndDt: [''],
      agencyId: [''],
      vendorIdTxt: [''],
      addressCd: [''],
      impStatusInd: [''],
      standardDeliverableInd: [''],
      projectDuration: [''],
      currentEndDt: new Date(),
      goalsTxt: [''],
      activeInd: [''],
      projId: [''],
      userId: [''],
      entryDt: new Date(),
      objectiveTxt: [''],
      projectTypeList: [null],
      projectDeliverableList: [null],
      projectTypeNbr: [''],
      DeliverableList: ['']
    });
  }
}

