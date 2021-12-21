import { State, RootObjectStates } from './../home/models/stateModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class VaccineService {

  constructor(private http: HttpClient) { }
  ngOnInit(){
    this.getStates();
  }
  //States Metadata
  getStates(){
    return this.http.get<any>('https://cdn-api.co-vin.in/api/v2/admin/location/states');
    }

  //Districts Metadata
  getDistricts(state_id:number)
  {
    return this.http.get<any>(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`);
  }

  //Vaccination Session by Pin
  getSessionByPin(pincode:number,date:string)
  {
    return this.http.get<any>("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin" + "?pincode=" + pincode + "&date=" +date);
  }

  //Vaccination Session by District
  getSessionByDistrict(district_id:number,date:String)
  {

    return this.http.get<any>("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict" + "?district_id=" + district_id + "&date=" + date);
  }

  //Vaccination Slot for week by pincode
  getSlotForWeekByPin(pincode:number,date:String)
  {
    return this.http.get<any>(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`);
  }

  //Vaccination slor for week by district
  getSlotForWeekByDistrict(district_id:number,date:String)
  {
    return this.http.get<any>(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${date}`);
  }



}
