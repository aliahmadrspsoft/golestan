import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { FakeMatrixreservationService } from 'src/test/fakes.spec';
import { MatrixreservationService } from '../matrixreservation.service';
import { MatrixreservationDetailComponent } from './matrixreservation-detail.component';

describe('MatrixreservationDetailComponent', () => {
  let component: MatrixreservationDetailComponent;
  let fixture: ComponentFixture<MatrixreservationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatrixreservationDetailComponent],
      imports: [
        MatChipsModule,
        MatDialogModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: MatrixreservationService, useClass: FakeMatrixreservationService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixreservationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
