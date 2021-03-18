import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EditPrjEventsPageEffects } from './edit-project-events-page.effects';

describe('EditPrjEventsPageEffects', () => {
  let actions$: Observable<any>;
  let effects: EditPrjEventsPageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditPrjEventsPageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(EditPrjEventsPageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
