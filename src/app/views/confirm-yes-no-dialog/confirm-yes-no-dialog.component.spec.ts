import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmYesNoDialogComponent } from './confirm-yes-no-dialog.component';

describe('ConfirmYesNoDialogComponent', () => {
  let component: ConfirmYesNoDialogComponent;
  let fixture: ComponentFixture<ConfirmYesNoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmYesNoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmYesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
