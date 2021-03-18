import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModificationsPersonnelComponent } from './modifications-personnel.component';

describe('ModificationsPersonnelComponent', () => {
  let component: ModificationsPersonnelComponent;
  let fixture: ComponentFixture<ModificationsPersonnelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationsPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationsPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
