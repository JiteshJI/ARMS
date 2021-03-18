
    export interface ContactItem {
      contactID: string;
      BusinessTitle: string;
      FirstName: string;
      LastName: string;
      Suffix: string;
      EmailAddress: string;
      OrilBrdMbr: string;
      ActiveInd: string;
      UserId: string;
      Entry_date: Date;
    }

    export class ContactItemRaw implements ContactItem {
        constructor(
          public contactID: string,
          public BusinessTitle: string,
          public FirstName: string,
          public LastName: string,
          public Suffix: string,
          public EmailAddress: string,
          public OrilBrdMbr: string,
          public ActiveInd: string,
          public UserId: string,
          public Entry_date: Date
          ) { }
        }

      export interface Item {
          text: string;
          value: string;
        }
