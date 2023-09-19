import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';

import { LoadingBackdropService } from '../../../core/services/loading-backdrop.service';
import { Matrixreservation } from '../../matrixreservation/matrixreservation.model';
import { MatrixreservationService } from '../../matrixreservation/matrixreservation.service';

@Component({
  selector: 'app-matrixreservation-list',
  templateUrl: './matrixreservation-list.component.html',
  styleUrls: ['./matrixreservation-list.component.scss']
})
export class MatrixreservationListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Matrixreservation>();
  displayedColumns: string[] = [
    'title',
    'overview',
    'popularity',
    'vote_average',
    'release_date',
  ];

  constructor(
    private loadingBackdropService: LoadingBackdropService,
    private matrixreservationService: MatrixreservationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadMatrixreservations();
  }

  loadMatrixreservations(pageEvent?: PageEvent) {
    const pageIndex = pageEvent ? pageEvent.pageIndex : 0;
    this.loadingBackdropService.show();

    this.matrixreservationService
      .list(pageIndex)
      .pipe(finalize(() => this.loadingBackdropService.hide()))
      .subscribe((data) => {
        this.dataSource.data = data.results;

        setTimeout(() => {
          if (this.dataSource.paginator) {
            this.dataSource.paginator.length = data.total_results;
            this.dataSource.paginator.pageIndex = data.page;
            this.dataSource.paginator.pageSize = 20;
          }
        });
      });
  }

  onCustomerAddNavigate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onMatrixreservationDetailNavigate(customer: Matrixreservation) {
    this.router.navigate([customer.id], { relativeTo: this.route });
  }

}
