export interface IBudget {
  projId: string;
  budgetCategory: number;
  budgetId: string;
  phaseId: string;
  bcAltId: number;
  budgetAmount: number;
  budgetTitle: string;
  odotFunding: number;
  orgCostSharing: number;
  qty?: number;
  amount?: number;
  notes: string;
  activeInd: string;
  entryDt: Date;
  userId: string;
  armsBudgetInventories: InventoryDetailRaw[];
}

export class Budget implements IBudget {
  projId: string;
  budgetCategory: number;
  budgetId: string;
  phaseId: string;
  bcAltId: number;
  budgetAmount: number;
  budgetTitle: string;
  odotFunding: number;
  orgCostSharing: number;
  qty?: number;
  amount?: number;
  notes: string;
  activeInd: string;
  entryDt: Date;
  userId: string;
  armsBudgetInventories: InventoryDetailRaw[];
  constructor(projId: string, budgetCategory: number, budgetId: string, phaseId: string, bcAltId: number, budgetAmount: number,
    budgetTitle: string, odotFunding: number, orgCostSharing: number, entryDt: Date, userId: string, activeInd: string, notes?: string, amount?: number, qty?: number, armsBudgetInventories?: InventoryDetailRaw[]) {
    this.projId = projId;
    this.budgetCategory = budgetCategory;
    this.budgetId = budgetId;
    this.phaseId = phaseId;
    this.bcAltId = bcAltId;
    this.budgetAmount = budgetAmount;
    this.budgetTitle = budgetTitle;
    this.odotFunding = odotFunding;
    this.orgCostSharing = orgCostSharing;
    this.qty = qty;
    this.amount = amount;
    this.notes = notes;
    this.activeInd = activeInd;
    this.entryDt = entryDt;
    this.userId = userId;
    this.armsBudgetInventories = armsBudgetInventories;
  }
}

export class InventoryDetailRaw {
  budgetId: string;
  inventoryNumber: string;
  userId: string;
  entryDate: Date;

  public static MakeClone(InvDtlToClone: InventoryDetailRaw): InventoryDetailRaw {
    const invd: InventoryDetailRaw = new InventoryDetailRaw();
    invd.budgetId = InvDtlToClone.budgetId;
    invd.inventoryNumber = InvDtlToClone.inventoryNumber;
    invd.userId = InvDtlToClone.userId;
    invd.entryDate = InvDtlToClone.entryDate;
    return invd;
  }

  public static MakeNewInvoiceDetail(bc: InventoryDetailRaw): InventoryDetailRaw {
    const invd: InventoryDetailRaw = new InventoryDetailRaw();
    invd.inventoryNumber = bc.inventoryNumber;//new
    invd.budgetId = bc.budgetId;
    invd.userId = bc.userId;
    invd.budgetId = bc.budgetId;
    return invd;
  }

}

export interface IBudgetCategory {
  budgetCatId: number;
  projId: string;
  budgetAmt: number;
  budgetCatText: string;
  bcAltId: number;
}

export class BudgetCategory implements IBudgetCategory {
  budgetCatId: number;
  projId: string;
  budgetAmt: number;
  budgetCatText: string;
  bcAltId: number;
}

//Fetch from API??
export enum BudgetDialogCategories {
  salariesandwages = 'Salaries and Wages',
  subcontractor = 'SubContractor 1',
  contingency = 'Contingency',
  equipment = 'Equipment'
}

export class OtherCategoryViewModel {
  constructor(public bcAltId: number, public budgetId: string, public phaseId: string, public phaseTxt: string, public budgetTitle,
    public odotFunding: number, public orgCostSharing: number, public activeInd: string) { }
}

export class SalaryWagesViewModel {
  constructor(public bcAltId: number, public budgetId: string, public phaseId: string, public phaseTxt: string, public budgetTitle,
    public qty: number, public odotFunding: number, public orgCostSharing: number, public notes: string, public activeInd: string, public budgetCategoryValue: number, public budgetCategoryText: string, public armsBudgetInventories: InventoryDetailRaw[]) { }
}

export class SubContractorViewModel {
  constructor(public bcAltId: number, public budgetId: string, public phaseId: string, public phaseTxt: string, public budgetTitle,
    public amount: number, public activeInd: string) { }
}
