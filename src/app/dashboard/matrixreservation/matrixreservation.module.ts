import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MatrixreservationRoutingModule } from './matrixreservation-routing.module';
import { MatrixreservationService } from './matrixreservation.service';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ...MatrixreservationRoutingModule.components
  ],
  imports: [
    MatrixreservationRoutingModule,
    SharedModule, 
	NgPersianDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [MatrixreservationService]
})
export class MatrixreservationModule { }
