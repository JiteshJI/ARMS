import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModificationsHeaderComponent } from './modifications-header.component';

describe('ModificationsHeaderComponent', () => {
  let component: ModificationsHeaderComponent;
  let fixture: ComponentFixture<ModificationsHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
