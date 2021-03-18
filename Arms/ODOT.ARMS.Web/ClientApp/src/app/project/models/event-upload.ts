export class EventUpload {
  eventUploadId: string;
  eventSrc: string;
  docName: string;
  fileSize: number;
  privateInd: string;
  activeInd: string;
  userId: string;
  uploadDate: Date;
  projAltId: string;
}

//used as a genaric key
export class UploadSrc {
  projAltId: string;
  srcId: string;

  //New constructor to cleanup code
  constructor(projAltId: string = '', srcId: string = '') {
    this.projAltId = projAltId;
    this.srcId = srcId;
  }
}


export enum PrivateFile {
  N = 0,
  Y = 1
}

