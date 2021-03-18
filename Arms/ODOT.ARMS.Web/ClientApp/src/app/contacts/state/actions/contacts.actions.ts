import { Action } from '@ngrx/store';
import {Update } from '@ngrx/entity';
import { ContactItemRaw } from '../../models/contacts.items';
import { ContactAgencyRaw } from '../../models/contacts.agency';

export enum contactActionTypes {
    LoadContacts =  '[contacts] Get Contacts',
    LoadContactsSuccess= '[contacts] Load contacts success',
    LoadContactsFail= '[contacts] Load contacts fail',
    GetCurrentContact= '[contacts] Get Current Contact',
    ShowContactsAF = '[contacts] SHOW CONTACTS A_F',
    ShowContactsGN = '[contacts] SHOW CONTACTS G_N',
    ShowContactsMR = '[contacts] SHOW CONTACTS M_R',
    ShowContactsSZ = '[contacts] SHOW CONTACTS S_Z',
    SaveCurrentContact = '[contacts] SAVE Current Contact success',
    CreateNewContact= '[contacts] CREATE new contact',
    CreateNewContactSuccess= '[contacts] CREATE New Contact success',
    CreateNewContactFail= '[contacts] CREATE New Contact fail',
    UpdateContact= '[contacts] UPDATE  contact',
    UpdateContactSuccess= '[contacts] UPDATE  Contact success',
    UpdateContactFail= '[contacts] UPDATE  Contact fail',
    InitializeCurrentContact= '[contacts] INITIALIZE Current Contact',
    LoadContactAgency =  '[contactAgency] GET ContactAgency',
    LoadContactAgencySuccess= '[contactAgency] LOAD contactAgencies success',
    LoadContactAgencyFail= '[contactAgency] LOAD contactAgencies fail',
    GetCurrentContactAgency= '[contactAgency] GET Current ContactAgency',
    SaveCurrentContactAgency = '[contactAgency] SAVE Current ContactAgency success',
    AddNewContactAgency= '[contactAgency] CREATE new contactAgency',
    AddNewContactAgencySuccess= '[contactAgency] CREATE New ContactAgency success',
    AddNewContactAgencyFail= '[contactAgency] CREATE New ContactAgency fail',
    UpdateContactAgency= '[contactAgency] UPDATE  contactAgency',
    UpdateContactAgencySuccess= '[contactAgency] UPDATE  ContactAgency success',
    UpdateContactAgencyFail= '[contactAgency] UPDATE  ContactAgency fail',
    SetContactsLoadedStateFalse ='[contacts] SET Contacts Loaded to false'
}



export class LoadContacts implements Action {

    readonly type = contactActionTypes.LoadContacts;

    constructor() {}
}

export class LoadContactsSuccess implements Action {

    readonly type = contactActionTypes.LoadContactsSuccess;
    constructor(public payload: ContactItemRaw[]) {}
}

export class LoadContactsFail implements Action {

    readonly type = contactActionTypes.LoadContactsFail;
    constructor(public payload: string) {}
}
export class GetCurrentContact implements Action {

    readonly type = contactActionTypes.GetCurrentContact;

    constructor() {}
}

export class ShowContactsAF implements Action {

    readonly type = contactActionTypes.ShowContactsAF;

    constructor() {}
}
export class ShowContactsGN implements Action {

    readonly type = contactActionTypes.ShowContactsGN;

    constructor() {}
}
export class ShowContactsMR implements Action {

    readonly type = contactActionTypes.ShowContactsMR;

    constructor() {}
}
export class ShowContactsSZ implements Action {

    readonly type = contactActionTypes.ShowContactsSZ;
    constructor() {}
}

export class SaveCurrentContact implements Action {

    readonly type = contactActionTypes.SaveCurrentContact;

    constructor(public payload: ContactItemRaw) {}
}

export class CreateNewContact implements Action {

    readonly type = contactActionTypes.CreateNewContact;

    constructor(public payload: ContactItemRaw) {}
}

export class CreateNewContactSuccess implements Action {

    readonly type = contactActionTypes.CreateNewContactSuccess;

    constructor(public payload: ContactItemRaw) {}
}

export class CreateNewContactFail implements Action {

    readonly type = contactActionTypes.CreateNewContactFail;

    constructor(public payload: string) {}
}

export class UpdateContact implements Action {

    readonly type = contactActionTypes.UpdateContact;

    constructor(public payload: ContactItemRaw) {}
}

export class UpdateContactSuccess implements Action {

    readonly type = contactActionTypes.UpdateContactSuccess;

    constructor(public payload: ContactItemRaw) {}
}

export class UpdateContactFail implements Action {

    readonly type = contactActionTypes.UpdateContactFail;

    constructor(public payload: string) {}
}
export class InitializeCurrentContact implements Action {

    readonly type = contactActionTypes.InitializeCurrentContact;

    constructor(public payload: ContactItemRaw) {}
}

export class LoadContactAgency implements Action {

    readonly type = contactActionTypes.LoadContactAgency;

    constructor(public payload: string) {}
}

export class LoadContactAgencySuccess implements Action {

    readonly type = contactActionTypes.LoadContactAgencySuccess;
    constructor(public payload: ContactAgencyRaw[]) {}
}
export class LoadContactAgencyFail implements Action {

    readonly type = contactActionTypes.LoadContactAgencyFail;
    constructor(public payload: string) {}
}
export class GetCurrentContactAgency implements Action {

    readonly type = contactActionTypes.GetCurrentContactAgency;

    constructor() {}
}
export class SaveCurrentContactAgency implements Action {

    readonly type = contactActionTypes.SaveCurrentContactAgency;

    constructor(public payload: ContactAgencyRaw) {}
}
export class AddNewContactAgency implements Action {

     readonly type = contactActionTypes.AddNewContactAgency;
     constructor(public payload: ContactAgencyRaw) {}
}
export class AddNewContactAgencySuccess implements Action {

    readonly type = contactActionTypes.AddNewContactAgencySuccess;
    constructor(public payload: ContactAgencyRaw) {}
}

export class AddNewContactAgencyFail implements Action {
    readonly type = contactActionTypes.AddNewContactAgencyFail;
    constructor(public payload: string) {}
}

export class UpdateContactAgency implements Action {

    readonly type = contactActionTypes.UpdateContactAgency;
    constructor(public payload: ContactAgencyRaw) {}
}

export class UpdateContactAgencySuccess implements Action {

    readonly type = contactActionTypes.UpdateContactAgencySuccess;
    constructor(public payload: ContactAgencyRaw) {}
}

export class UpdateContactAgencyFail implements Action {

    readonly type = contactActionTypes.UpdateContactAgencyFail;
    constructor(public payload: string) {}
}

export class SetContactsLoadedStateFalse implements Action {

    readonly type = contactActionTypes.SetContactsLoadedStateFalse;

    constructor(public payload: boolean) {}
}


export type contactActions =
|LoadContacts
|LoadContactsSuccess
|LoadContactsFail
|GetCurrentContact
|ShowContactsAF
|ShowContactsGN
|ShowContactsMR
|ShowContactsSZ
|SaveCurrentContact
|CreateNewContact
|CreateNewContactSuccess
|CreateNewContactFail
|UpdateContact
|UpdateContactSuccess
|UpdateContactFail
|InitializeCurrentContact
|LoadContactAgency
|LoadContactAgencySuccess
|LoadContactAgencyFail
|GetCurrentContactAgency
|SaveCurrentContactAgency
|AddNewContactAgency
|AddNewContactAgencySuccess
|AddNewContactAgencyFail
|UpdateContactAgency
|UpdateContactAgencySuccess
|UpdateContactAgencyFail
|SetContactsLoadedStateFalse;
