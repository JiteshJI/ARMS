import { createAction, props } from "@ngrx/store";
import { ProjectAbstract } from "../../models/project-abstract";

export const loadProjectAbstract = createAction(
    '[ProjectAbstract] Load Project Abstract',
    props<{ projectAltId: string }>()
);

export const loadProjectAbstractSuccess = createAction(
    '[ProjectAbstract] Load Project Abstract Success',
    props<{ projectAbstract: ProjectAbstract }>()
);

export const loadProjectAbstractFailure = createAction(
    '[ProjectAbstract] Load Project Abstract Failed',
    props<{ error: string }>()
);

export const updateProjectAbstract = createAction(
    '[ProjectAbstract] Update Project Abstract',
    props<{ newAbstract: ProjectAbstract }>()
);

export const updateProjectAbstractSuccess = createAction(
    '[ProjectAbstract] Update Project Abstract Success',
    props<{ newAbstract: ProjectAbstract }>()
);

export const updateProjectAbstractFailure = createAction(
    '[ProjectAbstract] Update Project Abstract Failure',
    props<{ error: string }>()
);

export const editProjectAbstractActionTypes = {
    loadProjectAbstract,
    loadProjectAbstractSuccess,
    loadProjectAbstractFailure,
    updateProjectAbstract,
    updateProjectAbstractSuccess,
    updateProjectAbstractFailure
}


