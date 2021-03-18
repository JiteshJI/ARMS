import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdministrationViewComponent } from './administration-view.component';

describe('AdministrationViewComponent', () => {
  let component: AdministrationViewComponent;
  let fixture: ComponentFixture<AdministrationViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
