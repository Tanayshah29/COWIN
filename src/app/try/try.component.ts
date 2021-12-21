import { RootObjectSession } from './../home/models/sessionModel';
import { RootObjectDistrict } from './../home/models/districtModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RootObjectWeekSlot } from '../home/models/slotDateRangeModel';

export class State {
  constructor(
    public state_id: number,
    public state_name: string
  ){}
}

export class RootObjectStates {
  constructor(
    public states: State[],
    public ttl: number
  ){}
}

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.css']
})
export class TryComponent implements OnInit {

  states!: RootObjectStates[];
  districts!: RootObjectDistrict[];
  session!: RootObjectSession[];
  calendar!: RootObjectWeekSlot[];
  mobile!: string;
  headerContentType: any;

  constructor(private http: HttpClient ) { }

  ngOnInit(): void {
    // this.getStates();
    // this.getDistricts(5);
    // this.getSessionByPin(452003,'11-08-2021');
    // this.getSessionByDistrict(512,'11-08-2021');
    // this.getSlotForWeekByPin(452003,'11-08-2021');
    // this.getSlotForWeekByDistrict(512,'11-08-2021');
    this.registerUser();
  }

  getStates(){
  this.http.get<any>('https://cdn-api.co-vin.in/api/v2/admin/location/states').subscribe(
  response =>{
    if(response){
      console.log(response);
      this.states = response;
    }});
  }

  //Districts Metadata
  getDistricts(state_id:number)
  {
    this.http.get<any>(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`).subscribe(
    response =>{
      console.log(response);
      this.districts = response;
    }
    );
  }

  getSessionByPin(pincode:number, date:string)
  {
    return this.http.get<any>("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin" + "?pincode=" + pincode + "&date=" +date).subscribe(
      response =>{
        console.log(response);
        this.session = response;
      }
      );
  }

  getSessionByDistrict(district_id:number,date:String)
  {

    return this.http.get<any>("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict" + "?district_id=" + district_id + "&date=" + date).subscribe(
      response =>{
        console.log(response);
        this.session = response;
      }
      );
  }

  //Vaccination Slot for week by pincode
  getSlotForWeekByPin(pincode:number,date:String)
  {
    return this.http.get<any>(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`).subscribe(
      response =>{
        console.log(response);
        this.calendar = response;
      }
      );
  }

    //Vaccination slor for week by district
    getSlotForWeekByDistrict(district_id:number,date:String)
    {
      return this.http.get<any>(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${date}`).subscribe(
        response =>{
          console.log(response);
          this.calendar = response;
        }
        );
    }

    registerUser(){
      const headerContentType = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const option = { headers: this.headerContentType};
      // const headers = { 'content-type': 'application/json'}
      this.mobile = '9826643721';
      const body=JSON.stringify(this.mobile);
      console.log(body)
      this.http.post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', body, option).subscribe(
        response =>{
          console.log(response);
        },
          err => {
              console.log(err.message);
          }
        );
    }

}
