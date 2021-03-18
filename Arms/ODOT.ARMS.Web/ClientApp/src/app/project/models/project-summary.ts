export class ProjectSummary {
    projectAltId: number;
    summaryTxt: string;
    projId: string;
    userId: string;

    public constructor(init?: Partial<ProjectSummary>) {
      Object.assign(this, init);
  }
  }

