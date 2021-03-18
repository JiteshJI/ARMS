import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialInvoicesCommentuploadsComponent } from './financial-invoices-commentuploads.component';

describe('FinancialInvoicesCommentuploadsComponent', () => {
  let component: FinancialInvoicesCommentuploadsComponent;
  let fixture: ComponentFixture<FinancialInvoicesCommentuploadsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialInvoicesCommentuploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInvoicesCommentuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
