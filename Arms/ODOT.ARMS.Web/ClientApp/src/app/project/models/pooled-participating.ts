export interface IPooledParticipating {
    PartId: string;
    fiscalYear: string;
    amountCommited: string;
    amountTransferred: string;
    fundingType: string;
    fundingSource: string;
    transferCode: string;
    transferRequestedDt: string;
    financeRequestedDt: string;
    transferReconciliationDt: string;
    fhwaApprovedDt: string;
    finalTransferDt: string;
    leadStateNotificationDt: string;
    publicCommentText: string;
    docCount: string;
}

export class PooledParticipating implements IPooledParticipating {
    public PartId: string;
    public fiscalYear: string;
    public amountCommited: string;
    public amountTransferred: string;
    public fundingType: string;
    public fundingSource: string;
    public transferCode: string;
    public transferRequestedDt: string;
    public financeRequestedDt: string;
    public transferReconciliationDt: string;
    public fhwaApprovedDt: string;
    public finalTransferDt: string;
    public leadStateNotificationDt: string;
    public publicCommentText: string;
    public docCount: string;

    public constructor (init?: Partial<PooledParticipating>) {
        Object.assign(this, init);
    }
}

