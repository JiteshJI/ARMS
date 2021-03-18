import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialHeaderComponent } from './financial-header.component';

describe('FinancialHeaderComponent', () => {
  let component: FinancialHeaderComponent;
  let fixture: ComponentFixture<FinancialHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
