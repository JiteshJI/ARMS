import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrjModificationsComponent } from './prj-modifications.component';

describe('PrjModificationsComponent', () => {
  let component: PrjModificationsComponent;
  let fixture: ComponentFixture<PrjModificationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjModificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjModificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
