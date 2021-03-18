export class AdministrationCategoryRaw implements AdministrationCategory {
  constructor(
    public administrationCategoryID: string,
    public administrationCategoryText: string,
    public controllingBoardApprvl: string,
    public activeind: string,
    public specificListID: string,
    public administrationCategoryActive: boolean,
    public primaryTypeId: string
  ) { }
}

export interface AdministrationCategory {
  administrationCategoryID: string;
  administrationCategoryText: string;
  controllingBoardApprvl: string;
  activeind: string;
  specificListID: string;
  administrationCategoryActive: boolean;
  primaryTypeId: string;
}
export class AdministrationCategoryViewModel {
  constructor(
    public administrationCategoryID: string,
    public administrationCategoryText: string,
    public controllingBoardApprvl: string,
    public activeind: string,
    public specificListID: string,
    public administrationCategoryActive: boolean,
    public primaryTypeId: string,
    public primaryTypeTxt: string) { }
}

export class SpecificListAdministrationRaw implements SpecificListAdministration {
  constructor(
    public specificListID: string,
    public specificListText: string,
    public specificListActive: string,
    public fundingTypeID: number
    
  ) { }
}

export interface SpecificListAdministration {
  specificListID: string;
  specificListText: string;
  specificListActive: string;
  fundingTypeID: number;
}

export class FundingTypeListAdministrationRaw implements FundingTypeListAdministration {
  constructor(
    public fundingTypeId: string,
    public fundingTypeTxt: string,
    public activeInd: string

  ) { }
}

export interface FundingTypeListAdministration {
  fundingTypeId: string;
  fundingTypeTxt: string;
  activeInd: string;
}


export interface Place {
  id: number;
  name: string;
}

export interface Car {
  id: number;
  brand: string;
  color: string;
}
