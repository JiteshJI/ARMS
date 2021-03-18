export class AgencyDetailRaw implements AgencyDetail {
  constructor(
    public agencyId: string,
    public agencyNameTxt: string,
    public agencyCatText: string,
    public agencyStatusInd: string,
    public controlBoardApprvlInd: string,
    public activInd: string,
    public userId: string,
    public entryDt: string
    
    
  ) { }
}

export interface AgencyDetail {
  agencyId: string;
  agencyNameTxt: string;
  agencyCatText: string;
  agencyStatusInd: string;
  controlBoardApprvlInd: string;
  activInd: string;
  userId: string;
  entryDt: string;
}

export class AddAgency {
  public agencyId: string;
  public agencyNameTxt: string;
  public agencyCatId: string;
  public agencyStatusInd : string;
  public controlBoardApprvlInd: string;
  public agencyCatText = '';
  public activInd: string;
  public userId: string;
  public entryDt: string;
}

export class AdministrationCategoryRaw implements AdministrationCategory {
  constructor(
    public administrationCategoryID: string,
    public administrationCategoryText: string,
    public controllingBoardApprvl: string,
    public aCTIVEIND: string,
    public specificListID: string,
    public administrationCategoryActive: string
  ) { }
}

export interface AdministrationCategory {
  administrationCategoryID: string;
  administrationCategoryText: string;
  controllingBoardApprvl: string;
  aCTIVEIND: string;
  specificListID: string;
  administrationCategoryActive: string;
}
