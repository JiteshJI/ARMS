import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModificationsUploadsComponent } from './modifications-uploads.component';

describe('ModificationsUploadsComponent', () => {
  let component: ModificationsUploadsComponent;
  let fixture: ComponentFixture<ModificationsUploadsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationsUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationsUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
