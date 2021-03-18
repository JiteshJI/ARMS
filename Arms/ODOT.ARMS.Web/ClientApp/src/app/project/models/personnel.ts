
export interface IPersonnel {
  personnelId: string;
  roleId: string;
  projId: string;
  contactId: string;
  isLeadInd: string;
  activeInd: string;
  UserId: string;
  Entry_date: Date;
  ContactName: string;
  agencyName: string;
  emailAddress: string;
  mobilePhone: string;
  role: string;
}

export class Personnel implements IPersonnel {
    public personnelId: string;
    public roleId: string;
    public projId: string;
    public contactId: string;
    public isLeadInd: string;
    public activeInd: string;
    public UserId: string;
    public Entry_date: Date;
    public ContactName: string;
    public agencyName: string;
    public emailAddress: string;
    public mobilePhone: string;
    public role: string;
}
