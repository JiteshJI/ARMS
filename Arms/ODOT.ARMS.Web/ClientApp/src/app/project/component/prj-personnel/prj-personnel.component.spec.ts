import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrjPersonnelComponent } from './prj-personnel.component';

describe('PrjPersonnelComponent', () => {
  let component: PrjPersonnelComponent;
  let fixture: ComponentFixture<PrjPersonnelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
