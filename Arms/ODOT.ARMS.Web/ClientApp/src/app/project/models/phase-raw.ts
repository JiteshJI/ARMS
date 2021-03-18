import { LookupItem } from "../../shared/models/lookup-item";

export class PhaseRaw {
  phaseId: string;
  projId: string;
  phaseNum: number;
  beginDate: Date;
  endDate: Date;
  amount: number;
  userId: string;
  entryDate: Date;
  activeInd: string;
  phaseTitle: string;
  mergeInd: string;
  mergePhaseId: string;
  isUpdated: string;
  isOld: boolean;
  statusId: string;


  public static buildPhaseLookupList(phaseList: PhaseRaw[], editPhaseId?: string) : LookupItem[] {
    let phaseLookupList: LookupItem[] = [];
    if (!(phaseList) || phaseList.length === 0)
      return phaseLookupList;

    const phasePrefix: string = "Merged Phase - ";    

    var phaseTxt = phaseList.filter(item => item.mergeInd === 'M').sort(this.compare).map(e => e.phaseNum).join(',');
    if (phaseTxt != '') {
      let phaseId: string = phaseList.find((item) => item.mergeInd === 'M').mergePhaseId;

      if ((editPhaseId)) {
        const idx: number = phaseList.findIndex((item) => item.mergeInd === 'M' && item.phaseId === editPhaseId);
        if (idx > -1) {
          phaseId = editPhaseId;//default to the child so that the dropdown will display correctly
        }
      }
      let itm = new LookupItem();
      itm.value = phaseId;
      itm.text = phasePrefix + phaseTxt;
      phaseLookupList.push(itm);
    }

    for (let i = 0; i < phaseList.length; i++) {
      var statusId: number = +phaseList[i].statusId;//for some reason, if have to convert and it is odd
      if (statusId !== PhaseStatus.Authorized)
        continue;

      if (phaseList[i].mergeInd === 'I') {

        let itm = new LookupItem();
        itm.value = phaseList[i].phaseId;
        itm.text = "Phase - " + phaseList[i].phaseNum;
        phaseLookupList.push(itm);
      }
    }
    return phaseLookupList;
  }

  public static buildGridPhaseLookupList(phaseList: PhaseRaw[]): LookupItem[] {
    let phaseLookupList: LookupItem[] = [];
    if (!(phaseList) || phaseList.length === 0)
      return phaseLookupList;
    let phasePrefix: string = "Merged Phase - ";
    
    var MergeId = null;

    var phaseTxt = phaseList.filter(item => item.mergeInd === 'M').sort(this.compare).map(e => e.phaseNum).join(',');
    for (let item of phaseList) {
      let itm = new LookupItem();
      itm.value = item.phaseId;
      if (item.mergeInd === 'M') {
        itm.text = phasePrefix + phaseTxt;
        phaseLookupList.push(itm);
        if (MergeId === null)
          MergeId = item.mergePhaseId;
      }
      else {
        itm.text = "Phase - " + item.phaseNum;
        phaseLookupList.push(itm);
      }
    }
    if (MergeId) {
      let itm = new LookupItem();
      itm.value = MergeId;
      itm.text = phasePrefix + phaseTxt;
      phaseLookupList.push(itm);
    }

    return phaseLookupList;
  }

  private static compare(a, b) {
    const bandA = a.phaseNum;
    const bandB = b.phaseNum;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

}

export enum PhaseStatus {
  Proposed = 167,
  Authorized = 168,
  Canceled = 169
}


/*
import { LookupItem } from "../../shared/models/lookup-item";

export class PhaseRaw {
  phaseId: string;
  projId: string;
  phaseNum: number;
  beginDate: Date;
  endDate: Date;
  amount: number;
  userId: string;
  entryDate: Date;
  activeInd: string;
  phaseTitle: string;
  mergeInd: string;
  mergePhaseId: string;
  isUpdated: string;
  isOld: boolean;
  statusId: string;

  public static buildPhaseDD(phaseList: PhaseRaw[]): PhaseDD[] {
    let phaseLookupDD: PhaseDD[] = [];
    if (!phaseList || phaseList.length === 0)
      return phaseLookupDD;

    const phasePrefix: string = "Merged Phase - ";

    let mergePhase: PhaseDD = null;
    let phaseTxt: string = phaseList.filter(item => item.mergeInd === 'M').sort(this.compare).map(e => e.phaseNum).join(',');
    if (phaseTxt != '') {
      mergePhase = new PhaseDD();
      mergePhase.value = phaseList.find((item) => item.mergeInd === 'M').mergePhaseId;
      mergePhase.text = phasePrefix + phaseTxt;
      phaseLookupDD.push(mergePhase);
    }

    for (let item of phaseList) {
      if ((mergePhase) && (item.mergeInd === 'M')) {
        mergePhase.mergedPhases.push(item.phaseId);
      }
      else {
        phaseLookupDD.push({ value: item.phaseId, text: "Phase - " + item.phaseNum, mergedPhases: [] });
      }
    }
    return phaseLookupDD;
  }

  //========================================================================================================================
  //
  //
  // Depreciated
  //
  //
  //========================================================================================================================
  public static buildPhaseLookupList(phaseList: PhaseRaw[]): LookupItem[]  {
    let phaseLookupList: LookupItem[] = [];
    if (!phaseList || phaseList.length === 0) return phaseLookupList;
    //Clear out all the proposed
    //phaseList = phaseList.filter(item => item.statusId !== '167');
    //if (!phaseList || phaseList.length === 0) return phaseLookupList;

    let phasePrefix: string = "Merged Phase - ";

    var phaseTxt = phaseList.filter(item => item.mergeInd === 'M').sort(this.compare).map(e => e.phaseNum).join(',');
    if (phaseTxt != '') {
      var phaseId = phaseList.find((item) => item.mergeInd === 'M').mergePhaseId;
      phaseLookupList.push({ value: phaseId, text: phasePrefix + phaseTxt });
    }

    for (let i = 0; i < phaseList.length; i++) {
      var statusId: number = +phaseList[i].statusId;//for some reason, if have to convert and it is odd
      if (statusId !== 168)
        continue;

      if ((phaseList[i].mergePhaseId === null) || (phaseList[i].mergePhaseId === 'I')) {
        phaseLookupList.push({ value: phaseList[i].phaseId, text: "Phase - " + phaseList[i].phaseNum });
      }
    }
    return phaseLookupList;
  }

  public static buildGridPhaseLookupList(phaseList: PhaseRaw[]) {
    if (!phaseList || phaseList.length === 0) return;
    let phasePrefix: string = "Merged Phase - ";
    let phaseLookupList: LookupItem[] = [];
    var MergeId = null;

    var phaseTxt = phaseList.filter(item => item.mergeInd === 'M').sort(this.compare).map(e => e.phaseNum).join(',');
    for (let item of phaseList) {
      if (item.mergeInd === 'M') {
        phaseLookupList.push({ value: item.phaseId, text: phasePrefix + phaseTxt });
        if (MergeId === null)
          MergeId = item.mergePhaseId;
      }
      else {
        phaseLookupList.push({ value: item.phaseId, text: "Phase - " + item.phaseNum });
      }
    }
    if (MergeId)
      phaseLookupList.push({ value: MergeId, text: phasePrefix + phaseTxt });

    return phaseLookupList;
  }

  private static compare(a, b) {
    const bandA = a.phaseNum;
    const bandB = b.phaseNum;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

}

export enum PhaseStatus {
  Proposed = 167,
  Authorized = 168,
  Canceled = 169
}

export class PhaseDD {
  public value: string;
  public text: string;
  public mergedPhases: string[] = [];//List of Phase IDs
}




 */
