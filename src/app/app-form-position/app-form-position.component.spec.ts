import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormPositionComponent } from './app-form-position.component';

describe('AppFormPositionComponent', () => {
  let component: AppFormPositionComponent;
  let fixture: ComponentFixture<AppFormPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFormPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFormPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
