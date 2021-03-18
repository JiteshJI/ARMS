export interface IAgencyDetail {
  agencyId: number;
  agencyNameTxt: string;
  agencyCatText: string;
  agencyCatId: number;
  vendorId: string;
  agencyStatusInd: string;
  controlBoardApprvlInd: string;
  activeInd: string;
  userId: string;
  entryDt: Date;
}
export class AgencyDetailModel implements IAgencyDetail {
  public agencyId: number;
  public agencyNameTxt: string;
  public agencyCatText: string;
  public agencyCatId: number;
  public agencyStatusInd: string;
  public controlBoardApprvlInd: string;
  public activeInd: string;
  public vendorId: string;
  public userId: string;
  public entryDt: Date;
}

export interface AdministrationCategory {
  administrationCategoryID: string;
  administrationCategoryText: string;
  controllingBoardApprvl: string;
  aCTIVEIND: string;
  specificListID: string;
  administrationCategoryActive: string;
}

export class AdministrationCategoryRaw implements AdministrationCategory {
  public administrationCategoryID: string;
  public administrationCategoryText: string;
  public controllingBoardApprvl: string;
  public aCTIVEIND: string;
  public specificListID: string;
  public administrationCategoryActive: string
}
