import { PrjDetailComponent } from '../component/prj-detail/prj-detail.component';

export class GenericLookupListForDD implements IGenericLookupListForDD {
  public value: string;
  public text: string;
  public primaryTypeId?: string;
}

export interface IGenericLookupListForDD {
  value: string;
  text: string;
  primaryTypeId?: string;
}

export class ProjectTypesList implements IGenericLookupListForDD {
  public value: string;
  public text: string;
}

export class ContactRoleList implements IGenericLookupListForDD {
  public value: string;
  public text: string;
}

export interface IGenericLookupListForDD {
  value: string;
  text: string;
  primaryTypeId?: string;
}

export interface IArray {
  value: number;
  text: string;
}

export class CollectionList implements IArray {
  value: number;
  text: string;
}

export class VendorAddressForDD implements IVendorAddressListForDD {
  public oaksVendorNo: string;
  public vendorName: string;
  public addressSeqNo: string;
  public vendorAddress: string;
}

export interface IVendorAddressListForDD {
  oaksVendorNo: string;
  vendorName: string;
  addressSeqNo: string;
  vendorAddress: string;
}



export class ProjectForUpdate {
  project_id: string;

  // get roles(): string {
  //  return this.claims.filter(c => c.type == 'Role').map(c => c.value).join(", ");
  // }

  constructor() {

  }
}

export interface IdateModel {
  ContractstandardStartDate: Date;
  ContractstandardEndDate: Date;
  CalculatedValue: number;
}

export class dateModel implements IdateModel {
  ContractstandardStartDate: Date;
  ContractstandardEndDate: Date;
  CalculatedValue: number;
}

export class WarehouseData {
  public pidNumber: number;
  public fanNumber: string;
  public agreementNumber: string;
  public stateJobNumber: string;
}



