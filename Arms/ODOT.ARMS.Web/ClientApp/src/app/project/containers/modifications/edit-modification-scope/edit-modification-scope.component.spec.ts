import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditModificationScopeComponent } from './edit-modification-scope.component';

describe('EditModificationScopeComponent', () => {
  let component: EditModificationScopeComponent;
  let fixture: ComponentFixture<EditModificationScopeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModificationScopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModificationScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
