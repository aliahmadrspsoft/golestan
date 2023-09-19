import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatrixreservationListComponent } from './matrixreservation-list/matrixreservation-list.component';
import { MatrixreservationDetailComponent } from './matrixreservation-detail/matrixreservation-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MatrixreservationListComponent
  },
  {
    path: 'new',
    component: MatrixreservationDetailComponent
  },
  {
    path: ':id',
    component: MatrixreservationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MatrixreservationRoutingModule {
  static components = [MatrixreservationListComponent, MatrixreservationDetailComponent];
}
