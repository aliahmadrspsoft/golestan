import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { MatrixreservationListComponent } from './matrixreservation-list.component';
import { FakeMatrixreservationService } from 'src/test/fakes.spec';
import { MatrixreservationService } from '../matrixreservation.service';

describe('MatrixreservationListComponent', () => {
  let component: MatrixreservationListComponent;
  let fixture: ComponentFixture<MatrixreservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatrixreservationListComponent],
      imports: [
        MatSnackBarModule,
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
    fixture = TestBed.createComponent(MatrixreservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
