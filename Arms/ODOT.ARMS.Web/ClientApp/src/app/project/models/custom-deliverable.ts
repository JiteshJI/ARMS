
 export interface IDeliverable {
  projectDeliverableId: string;
  projectId: string;
  deliverableId: string;
  deliverableTxt: string;
  projAltId: number;
  activeInd: string;
  deliverableType: string;
  userId: string;
 }
 export class Deliverable implements IDeliverable {
  projectDeliverableId: string;
  projectId: string;
  deliverableId: string;
  deliverableTxt: string;
  projAltId: number;
  activeInd: string;
  deliverableType: string;
  userId: string;
}

