import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Matrixreservation } from './matrixreservation.model';
import { Paginator } from 'src/app/core/models/paginator.model';

@Injectable()
export class MatrixreservationService {

  constructor(
    private handler: HttpBackend,
    private http: HttpClient
  ) {
    this.http = new HttpClient(handler); /// to skip interceptors, becouse this service hits third backend provider
  }

  list(pageIndex: number): Observable<Paginator<Matrixreservation>> {
    let params = new HttpParams();
    params = params.append('api_key', '3661411c65331184ac73d8660d0b4648');
    params = params.append('language', 'en-US');
    params = params.append('page', String(pageIndex + 1));

    return this.http.get<Paginator<Matrixreservation>>(`${environment.MatrixreservationDB.host}/Matrixreservation/now_playing`, { params })
      .pipe(
        map(response => {
          response.page = response.page - 1;
          return response;
        })
      );
  }

  get(id: string): Observable<Matrixreservation> {
    let params = new HttpParams();
    params = params.append('api_key', '3661411c65331184ac73d8660d0b4648');
    params = params.append('language', 'en-US');

    return this.http.get(`${environment.MatrixreservationDB.host}/Matrixreservation/${id}`, { params })
      .pipe(
        map((data: any) => {
          console.log(data);
          return data;
        })
      );
  }

  delete(id: string): Observable<any> {
    // Let's going to mock a backend response,because there is no API available for delete
    return of('Matrixreservation was deleted')
      .pipe(
        delay(500)
      );
  }

}
