import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialDeductionsComponent } from './financial-deductions.component';

describe('FinancialDeductionsComponent', () => {
  let component: FinancialDeductionsComponent;
  let fixture: ComponentFixture<FinancialDeductionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialDeductionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
