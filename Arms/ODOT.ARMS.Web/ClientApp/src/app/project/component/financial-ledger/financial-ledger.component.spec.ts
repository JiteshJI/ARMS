import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialLedgerComponent } from './financial-ledger.component';

describe('FinancialLedgerComponent', () => {
  let component: FinancialLedgerComponent;
  let fixture: ComponentFixture<FinancialLedgerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
