import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModificationsFundingComponent } from './modifications-funding.component';

describe('ModificationsFundingComponent', () => {
  let component: ModificationsFundingComponent;
  let fixture: ComponentFixture<ModificationsFundingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationsFundingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationsFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
