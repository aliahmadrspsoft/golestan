import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Matrixreservation } from '../matrixreservation.model';
import { MatrixreservationService } from '../matrixreservation.service';
import { LoadingBackdropService } from '../../../core/services/loading-backdrop.service';
import { ConfirmDialogComponent } from '../../../shared/utils/dialogs/confirm-dialog/confirm-dialog.component';
import { MOCKED_FEATURES_WARNING_MESSAGE } from '../matrixreservation.constants';

@Component({
  selector: 'app-matrixreservation-detail',
  templateUrl: './matrixreservation-detail.component.html',
  styleUrls: ['./matrixreservation-detail.component.scss']
})
export class MatrixreservationDetailComponent implements OnInit, OnDestroy {
  matrixreservationId!: string;
  pageType!: string;
  matrixreservationForm!: FormGroup;
  addSuscription!: Subscription;
  deleteSuscription!: Subscription;
  matrixreservation!: Matrixreservation;

  constructor(
    private dialog: MatDialog,
    private loadingBackdropService: LoadingBackdropService,
    private matrixreservationService: MatrixreservationService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.initFormBuilder();
  }

  ngOnInit() {
    this.matrixreservationId = this.route.snapshot.params['id'];

    if (this.matrixreservationId) {
      this.pageType = 'edit';
      this.loadingBackdropService.show();
      this.matrixreservationService
        .get(this.matrixreservationId)
        .pipe(finalize(() => this.loadingBackdropService.hide()))
        .subscribe(
          data => this.loadFormData(data),
          error => {}
        );
    } else {
      this.pageType = 'new';
    }

    this.showMockedFeaturesWarning();
  }

  ngOnDestroy() {
    this.snackBar.dismiss();
  }

  navigateToListPage() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  addMatrixreservation() {
    this.showMockedFeaturesWarning();
  }

  saveMatrixreservation() {
    this.showMockedFeaturesWarning();
  }

  confirmDeleteMatrixreservation() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        body: 'Are you sure you want to delete this Matrixreservation?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMatrixreservation();
      }
    });
  }

  private initFormBuilder() {
    this.matrixreservationForm = new FormGroup({
      adult: new FormControl({ value: null, disabled: false }),
      backdrop_path: new FormControl({ value: null, disabled: false }),
      budget: new FormControl({ value: null, disabled: false }),
      homepage: new FormControl({ value: null, disabled: false }),
      // genre_ids: new FormControl({ value: null, disabled: false }),
      // id: new FormControl({ value: null, disabled: false }),
      original_language: new FormControl({ value: null, disabled: false }),
      original_title: new FormControl({ value: null, disabled: false }),
      overview: new FormControl({ value: null, disabled: false }),
      popularity: new FormControl({ value: null, disabled: false }),
      poster_path: new FormControl({ value: null, disabled: false }),
      release_date: new FormControl({ value: null, disabled: false }),
      title: new FormControl({ value: null, disabled: false }, Validators.required),
      video: new FormControl({ value: null, disabled: false }),
      vote_average: new FormControl({ value: null, disabled: false }),
      vote_count: new FormControl({ value: null, disabled: false }),
    });
  }

  private loadFormData(matrixreservation: Matrixreservation) {
    this.matrixreservation = matrixreservation;

    this.matrixreservationForm.setValue({
      adult: matrixreservation.adult,
      backdrop_path: matrixreservation.backdrop_path,
      budget: matrixreservation.budget,
      homepage: matrixreservation.homepage,
      // genre_ids: matrixreservation.genre_ids,
      // id: matrixreservation.id,
      original_language: matrixreservation.original_language,
      original_title: matrixreservation.original_title,
      overview: matrixreservation.overview,
      popularity: matrixreservation.popularity,
      poster_path: matrixreservation.poster_path,
      release_date: matrixreservation.release_date,
      title: matrixreservation.title,
      video: matrixreservation.video,
      vote_count: matrixreservation.vote_count,
      vote_average: matrixreservation.vote_average,
    });
  }

  private deleteMatrixreservation() {
    this.deleteSuscription = this.matrixreservationService
      .delete(this.matrixreservationId)
      .subscribe(() => {
        this.showMockedFeaturesWarning();
      });
  }

  private showMockedFeaturesWarning() {
    this.snackBar.open(MOCKED_FEATURES_WARNING_MESSAGE, 'OK', { duration: 10000 });
  }

}
