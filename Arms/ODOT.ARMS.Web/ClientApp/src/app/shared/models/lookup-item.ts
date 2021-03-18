export class LookupItem {
  public value: string;
  public text: string;
  public primaryTypeId?: string;

  public static getTxtById(id: string, lst: LookupItem[]): string {
    var retVal = ''
    if ((typeof (id) === 'undefined') || (id === null) || (id === "null"))
      return '';

    try {
      for (let el of lst) {
        if (el.value === id) {
          retVal = el.text;
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return retVal;
  }
  public static newLookItem(value: string, text: string, primaryTypeId?: string) {
    const ret = new LookupItem();
    ret.primaryTypeId = primaryTypeId;
    ret.value = value;
    ret.text = text;
    return ret;
  }
}

export enum LookupItemKeys {
  AgencyCategory = 1,
  ContactRoles = 2,
  CBType = 3,
  CBStatus = 4,
  DeliverableType = 5,
  DeliverableStatus = 6,
  FundingSrc = 7,
  FundingType = 8,
  FundingCategory = 24,
  BudgetCategory = 9,
  FundingStatus = 10,
  ImplementationStatus = 11,
  MeetingTypes = 12,
  ModificationStatus = 13,
  PrjClassification = 14,
  PrjType = 15,
  PrjStatus = 16,
  PooledFundingStatus = 17,
  PrimaryEvents = 18,
  SecondaryEvents = 19,
  CBCategory = 21,
  PhaseStatus = 22
}

//=============================================================================================================================================
//
// The only problem I see with these hardcoded enums
// is the fact we allow our system to modify these values (so the meaning of the code could change in the future)
// That of course would break things and force us back into the code
export enum FundingStatus {
  Hold = 130,
  Approved = 131,
  Denied = 133
}

export enum BudgetCategory {
  Salaries_and_Wages = 34, 
  Fringe_Benefits = 35, 
  Travel = 36,
  Supplies = 37, 
  Equipment = 38, 
  Printing = 39, 
  InDirect_Costs = 40, 
  Other_Expenses = 42,
  Contingency = 43, 
  Fee = 44, 
  Overhead = 45, 
  Subcontractor = 46, 
  Fees_1 = 53, 
  Fees_2 = 54,
  Fees_3 = 55, 
  Design = 56, 
  Site = 57, 
  Installation = 58, 
  Withholding = 59, 
  Withholding_Adjustment = 60, 
  Indirect_Costs_220 = 61
}
