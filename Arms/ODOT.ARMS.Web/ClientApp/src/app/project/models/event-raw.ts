
export class EventRaw {
  eventSrc: string;
  primaryTypeId: number;
  secondaryTypeId: number;
  invoiceNumber: string;
  publicCommentTxt: string;
  privateCommentTxt: string;
  userId: string;
  beginDate: Date;
  endDate: Date;
  activeInd: string;
  eventId: string;
  docCnt: number;
  projectId: string;
  contactId: string;
  contactIdList: ContactIdList[];
}

export class ContactIdList {
  contactId: string;
  constructor(typeId: string) {
    this.contactId = typeId;
  }
}
export class EventViewModel {
  constructor(
    public eventSrc: string,
    public phaseTxt: string,
    public primaryTypeId: number,
    public primaryTypeTxt: string,
    public secondaryTypeId: number,
    public secondayTypeTxt: string,
    public invoiceNumber: string,
    public publicCommentTxt: string,
    public privateCommentTxt: string,
    public userId: string,
    public beginDate: Date,
    public endDate: Date,
    public activeInd: string,
    public statusTxt: string,
    public eventId: string,
    public docCnt: number,
    public projectId: string,
    public contactId: string,
    public contactRoleName: string
  ) { }
}
