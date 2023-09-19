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
    columns = [
    { columnDef: 'shomareotagh', header: 'شماره اتاق',    cell: (element: any) => `${element.shomareotagh}` },
    { columnDef: 'day1',     header: '1402/06/27',   cell: (element: any) => `${element.day1}`     },
    { columnDef: 'day2',   header: '1402/06/08', cell: (element: any) => `${element.day2}`   },
    { columnDef: 'day3',   header: '1402/06/09', cell: (element: any) => `${element.day3}`   },
    { columnDef: 'day4',   header: '1402/06/10', cell: (element: any) => `${element.day4}`   },
    { columnDef: 'day5',   header: '1402/06/11', cell: (element: any) => `${element.day5}`   },
    { columnDef: 'day6',   header: '1402/06/12', cell: (element: any) => `${element.day6}`   },
    { columnDef: 'day7',   header: '1402/06/13', cell: (element: any) => `${element.day7}`   },
    { columnDef: 'day8',   header: '1402/06/14', cell: (element: any) => `${element.day8}`   },
    { columnDef: 'day9',   header: '1402/06/15', cell: (element: any) => `${element.day9}`   },
    { columnDef: 'day10',   header: '1402/06/16', cell: (element: any) => `${element.day10}`   },
	
  ];
    displayedColumn = this.columns.map(c => c.columnDef);

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
