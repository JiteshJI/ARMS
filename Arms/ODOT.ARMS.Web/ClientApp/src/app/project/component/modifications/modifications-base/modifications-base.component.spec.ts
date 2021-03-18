import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModificationsBaseComponent } from './modifications-base.component';

describe('ModificationsBaseComponent', () => {
  let component: ModificationsBaseComponent;
  let fixture: ComponentFixture<ModificationsBaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
