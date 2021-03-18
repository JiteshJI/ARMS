import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialInvoicesBalancesComponent } from './financial-invoices-balances.component';

describe('FinancialInvoicesBalancesComponent', () => {
  let component: FinancialInvoicesBalancesComponent;
  let fixture: ComponentFixture<FinancialInvoicesBalancesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialInvoicesBalancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInvoicesBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
