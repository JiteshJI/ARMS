import { ProjectType, IProject, Project, ProjectForSearch } from '../../models/projects';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';


export const loadProjectTypes = createAction(
  '[ProjectType List] Load ProjectType via Service',
);

export const projectTypesLoaded = createAction(
  '[ProjectType Effect] ProjectType Loaded Successfully',
  props<{ ProjectTypeList: ProjectType[] }>()
);

export const createProjectType = createAction(
  '[Create ProjectType Component] Create ProjectType',
  props<{ projectType: ProjectType}>()
);

export const deleteProjectType = createAction(
  '[ProjectType List Operations] Delete ProjectType',
  props<{projectTypeId: string}>()
);

export const updateProjectType = createAction(
  '[ProjectType List Operations] Update ProjectType',
  props<{ update: Update<ProjectType>}>()
);

//**************************Project***********************//
export const loadProject = createAction(
  '[Project List] Load Project via Service',
);
export const loadProjectsForSearch = createAction(
  '[Project List] Load Projects for search via Service',
);

export const loadProjectsForSearchSuccess = createAction(
  '[Project Effect] Projects for search Loaded Successfully',
  props<{ projects: ProjectForSearch[] }>()
);

export const projectLoaded = createAction(
  '[Project Effect] Project Loaded Successfully',
  props<{ ProjectList: Project[] }>()
);

export const loadSelectedProject = createAction(
  '[Selected Project List] Load Selected Project via Service',
  props<{ projectId: string }>()
);
export const selectedProjectLoaded = createAction(
  '[Selected Project Effect] Selected Project Loaded Successfully',
  props<{ SelectedProject: IProject }>()
);

export const createProject = createAction(
  '[Create Project Component] Create Project',
  props<{ project: Project }>()
);

export const deleteProject = createAction(
  '[Project List Operations] Delete Project',
  props<{ projectId: string }>()
);

export const updateProject = createAction(
  '[Project List Operations] Update Project',
  props<{ update: Update<Project> }>()
);
//**************************Project***********************//

export const projectActionTypes = {
  loadProjectTypes,
  projectTypesLoaded,
  createProjectType,
  deleteProjectType,
  updateProjectType,
  loadProject,
  loadProjectsForSearch,
  loadProjectsForSearchSuccess,
  projectLoaded,
  loadSelectedProject,
  selectedProjectLoaded,
  createProject,
  deleteProject,
  updateProject
};
