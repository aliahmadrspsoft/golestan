import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

export const DashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'matrixreservation',
                pathMatch: 'full'
            },
            {
                path: 'matrixreservation',
                loadChildren: () => import('./matrixreservation/matrixreservation.module').then(m => m.MatrixreservationModule),
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(DashboardRoutes) ],
    exports: [ RouterModule ]
})

export class DashboarRoutingModule {
  static components = [DashboardComponent, HomeComponent];
}
