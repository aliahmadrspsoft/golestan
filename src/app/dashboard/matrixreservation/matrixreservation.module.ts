import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MatrixreservationRoutingModule } from './matrixreservation-routing.module';
import { MatrixreservationService } from './matrixreservation.service';


@NgModule({
  declarations: [
    ...MatrixreservationRoutingModule.components
  ],
  imports: [
    MatrixreservationRoutingModule,
    SharedModule
  ],
  providers: [MatrixreservationService]
})
export class MatrixreservationModule { }
