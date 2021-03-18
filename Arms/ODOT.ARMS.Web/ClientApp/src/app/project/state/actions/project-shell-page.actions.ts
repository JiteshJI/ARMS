import { createAction, props } from '@ngrx/store';
import { ProjectHeader } from '../../models/project-header';

export const loadProjectHeader = createAction(
  '[ProjectShellPage] Load Project Header',
  props<{ projectHeader: ProjectHeader }>()
);

export const projectShellActionTypes = {
  loadProjectHeader,
};
