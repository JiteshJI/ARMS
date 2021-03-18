import { LookupItem } from "../../shared/models/lookup-item";

export class InvoiceRaw {
  constructor() {
    this.invoiceDetails = new Array<InvoiceDetailRaw>();
  }
  invoiceId: string;
  phaseId: string;
  projId: string;
  invRcvdDt: Date;
  invDt: Date;
  startDt: Date;
  endDt: Date;
  invToFinancePaidDt: Date;
  properInvDt: Date;
  finalNoticeInd: string;
  invNum: string;
  //userId: string;// do I really need this
  //entryDt: Date;// do I really need this
  fundingStatusCd: number;
  docCnt: number;
  publicCommentTxt: string;
  privateCommentTxt: string;
  invoiceDetails: InvoiceDetailRaw[];
}

export class InvoiceDetailRaw {
  invoiceDetailId: number;
  budgetCategoryId: number;
  budgetId: number;
  invAmt: number;
  invDtlKey: string;

  public static MakeClone(InvDtlToClone: InvoiceDetailRaw): InvoiceDetailRaw {
    const invd: InvoiceDetailRaw = new InvoiceDetailRaw();
    invd.invoiceDetailId = InvDtlToClone.invoiceDetailId;
    invd.budgetCategoryId = InvDtlToClone.budgetCategoryId;
    invd.budgetId = InvDtlToClone.budgetId;
    invd.invAmt = InvDtlToClone.invAmt;
    invd.invDtlKey = '';
    if (InvDtlToClone.budgetCategoryId)
      invd.invDtlKey += InvDtlToClone.budgetCategoryId;
    if (InvDtlToClone.budgetId)
      invd.invDtlKey += '-' + InvDtlToClone.budgetId;
    return invd;
  }

  public static MakeNewInvoiceDetail(bc: BudgetCatDDRaw, amt : number): InvoiceDetailRaw {
    const invd: InvoiceDetailRaw = new InvoiceDetailRaw();
    invd.invoiceDetailId = 0;//new
    invd.budgetCategoryId = bc.budgetCatId;
    invd.budgetId = bc.budgetId;
    invd.invAmt = amt;
    invd.invDtlKey = '';
    if (bc.budgetCatId)
      invd.invDtlKey += bc.budgetCatId;
    if (bc.budgetId)
      invd.invDtlKey += '-' + bc.budgetId;
    return invd;
  }

  /*
  public static makeKey(invDtl: InvoiceDetailRaw): string {
    let ret: string = '';
    if (invDtl.budgetCategoryId) { 
      ret += invDtl.budgetCategoryId.toString();

      if (invDtl.budgetId) {
        console.info('3', ret);
        ret += '-' + invDtl.budgetId.toString();
        console.info('4', ret);
      }
    }
    return ret;
  }*/
}


// Yes Budget Cats can draw
export class BudgetCatDDRaw {
  phaseId: string;
  budgetCatId: number;
  budgetId: number;
  lookupTitle: string;
  lookupKey: string;
  budgetAmt: number;

  // This will build a complete listing
  public static buildBudgetCategoryLookupList(phaseId: string, budgetCatDDList: BudgetCatDDRaw[]): LookupItem[] {
    let budgetCatLookupList: LookupItem[] = [];
    if (!budgetCatDDList || budgetCatDDList.length === 0)
      return budgetCatLookupList;

    budgetCatDDList.forEach(bc => {
      if (!phaseId) {
        budgetCatLookupList.push({ value: bc.lookupKey, text: bc.lookupTitle});
      }
      else if (bc.phaseId === phaseId) {
        budgetCatLookupList.push({ value: bc.lookupKey, text: bc.lookupTitle });
      }
    });
    return budgetCatLookupList;
  }
}

export enum FundingStatusCds {
  Hold = 130,
  Approved = 131,
  Denied = 133
}


