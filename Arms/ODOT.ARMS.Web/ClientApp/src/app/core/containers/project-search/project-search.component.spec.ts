import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectSearchComponent } from './project-search.component';

describe('ProjectSearchComponent', () => {
  let component: ProjectSearchComponent;
  let fixture: ComponentFixture<ProjectSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
