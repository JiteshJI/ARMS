export interface ILedger {
  phase: string,
  category: string,
  title: string,
  transactionType: string,
  amount: number,
  user: string,
  date: Date,
  rowNum: number
}
export class LedgerRaw implements ILedger {
  phase: string;
  category: string;
  title: string;
  transactionType: string;
  amount: number;
  user: string;
  date: Date;
  rowNum: number;
}
