import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const URL = "https://cdn-api.co-vin.in/api";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  
  baseURl:string = "https://cdn-api.co-vin.in/api"

  constructor(private http: HttpClient) { }

 
  // const body = { "mobile": "9826643721"};

  // this.http.post<any>(`${this.baseURl}/v2/auth/public/generateOTP`, body).
  //   pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError( error => {
  //       return throwError( 'Something went wrong!' );
  //     })
  // );
    // }
}
