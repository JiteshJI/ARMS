
export class GenericLookupListForDD implements IGenericLookupListForDD {
  public value: string;
  public text: string;
}

export interface IGenericLookupListForDD {
  value: string;
  text: string;
}

export class ProjectTypesList implements IGenericLookupListForDD {
  public value: string;
  public text: string;
}

export interface IGenericLookupListForDD {
  value: string;
  text: string;
}

export class VendorAddressForDD implements IVendorAddressListForDD {
  public OaskVendorNo: string;
  public VendorName: string;
  public AddressSeqNo: string;
  public VendorAddress: string;
}

export interface IVendorAddressListForDD {
  OaskVendorNo: string;
  VendorName: string;
  AddressSeqNo: string;
  VendorAddress: string;
}


export class ProjectForUpdate {
  project_id: string;

  //get roles(): string {
  //  return this.claims.filter(c => c.type == 'Role').map(c => c.value).join(", ");
  //}

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


