import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { LoadingBackdropService } from '../../../core/services/loading-backdrop.service';
import { Matrixreservation } from '../../matrixreservation/matrixreservation.model';
import { MatrixreservationService } from '../../matrixreservation/matrixreservation.service';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY_FIELD } from '../matrixreservation.constants';

@Component({
  selector: 'app-matrixreservation-list',
  templateUrl: './matrixreservation-list.component.html',
  styleUrls: ['./matrixreservation-list.component.scss']
})
export class MatrixreservationListComponent implements OnInit {
  IdKindStay=0;
  countDay=0;
  FromDate="";
  txt="";
  displayedColumn: string[]= [];  
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  //@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Matrixreservation>();
  dateValue = new FormControl();

  constructor(
    private loadingBackdropService: LoadingBackdropService,
    private matrixreservationService: MatrixreservationService,
    private route: ActivatedRoute,
    private router: Router,
	private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    this.loadMatrixreservations();


  }
    ngOnDestroy() {
    this.snackBar.dismiss();
  }

  loadMatrixreservations(pageEvent?: PageEvent) {
    const pageIndex = pageEvent ? pageEvent.pageIndex : 0;
    this.loadingBackdropService.show();

    this.matrixreservationService
      .list(pageIndex,this.IdKindStay,this.countDay,this.FromDate )
      .pipe(finalize(() => this.loadingBackdropService.hide()))
      .subscribe((data) => {
	  //this.columns=data.header;
	  //this.displayedColumn = this.columns.map(c => c.columnDef);
	  this.displayedColumn = Object.keys(data.results[0]).map(k => k)
      this.dataSource.data = data.results;

      });
  }

  onCustomerAddNavigate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onMatrixreservationDetailNavigate(rowmatrix: Matrixreservation) {
    this.router.navigate([rowmatrix.id], { relativeTo: this.route });
  }
  getDataTable(){
this.txt="";
  if(this.IdKindStay==0){
	  this.txt +="فیلد مکان اقامتی را پر کنید -";
	  }
  if(this.countDay==0){
	  this.txt +="فیلد  تعداد روز را پر کنید  -";
	  }
	   if(this.FromDate==""){
	  this.txt +="فیلد  تاریخ شروع را  پر کنید  -";
	  }
  if(this.txt!=""){
    this.showWarning(this.txt); 
	}
	else{
    this.loadMatrixreservations();
	}
  }
    private showWarning(txt:string) {
    this.snackBar.open(txt, 'باشه', 
					{ duration: 5000, panelClass: ['red-snackbar'],},
					
					);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
