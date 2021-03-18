import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrjDetailComponent } from './prj-detail.component';

describe('PrjDetailComponent', () => {
  let component: PrjDetailComponent;
  let fixture: ComponentFixture<PrjDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrjDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrjDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
