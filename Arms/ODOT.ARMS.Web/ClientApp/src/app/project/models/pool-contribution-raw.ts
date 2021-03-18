export class FundingRaw {
  contributionId: string;
  projectId: string;
  fiscalYr: string;
  amountCommitted: number;
  amountTransferred: string;
  transfrRecDate: Date;
  commentText: string;
  userId: string;
  entryDate: Date;
  activeInd: string;
  usStatesId: string;
  docCnt: number;
}


export class FundingGridViewModel {
  constructor(public encumbranceId: string,
    public projectId: string,
    public encubranceTypeCD: number,
    public fundingSrcCD: number,
    public fundingSrcTxt: string,
    public fundingTypeCD: number,
    public fundingTypeTxt: string,
    public categoryId: number,
    public categoryTxt: string,
    public fiscalYr: number,
    public encubrancePONum: string,
    public amount: number,
    public userId: string,
    public entryDate: Date,
    public activeInd: string,
    public docCnt: number, public notes: string) { }
}
