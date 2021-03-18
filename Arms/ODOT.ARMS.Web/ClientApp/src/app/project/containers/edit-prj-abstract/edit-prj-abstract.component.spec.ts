import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditPrjAbstractComponent } from './edit-prj-abstract.component';

describe('EditPrjAbstractComponent', () => {
  let component: EditPrjAbstractComponent;
  let fixture: ComponentFixture<EditPrjAbstractComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrjAbstractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrjAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
