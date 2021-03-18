import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialInvoicesInvoiceComponent } from './financial-invoices-invoice.component';

describe('FinancialInvoicesInvoiceComponent', () => {
  let component: FinancialInvoicesInvoiceComponent;
  let fixture: ComponentFixture<FinancialInvoicesInvoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialInvoicesInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInvoicesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
