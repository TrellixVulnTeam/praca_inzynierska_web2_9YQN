import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBookComponent } from './approve-book.component';

describe('ApproveBookComponent', () => {
  let component: ApproveBookComponent;
  let fixture: ComponentFixture<ApproveBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
