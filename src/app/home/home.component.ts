import { RootObjectStates, State } from './models/stateModel';
import { VaccineService } from './../services/vaccine-service.service';
import { Component, OnInit } from '@angular/core';
import { District, RootObjectDistrict } from './models/districtModel';
import { RootObjectSession, Session } from './models/sessionModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    //Based on value UI will be displayed
    searchByPin!:boolean;
    searchByDistrict!:boolean;
    showSearchedRecordsByDistrict!:boolean;
    showSearchedRecordsByPincode!:boolean;
    showSearchedNoRecords!:boolean;

    //object for storing result of API
    allstates!: RootObjectStates;
    myStateArray: State[]=[];
    allDistricts!: RootObjectDistrict;
    myDistrictsArray : District[]=[];
    allSessions!: RootObjectSession;
    mySessionArray: Session[]=[];

    allSessions2!:RootObjectSession;
    mySessionArray2: Session[]=[];

    //Storing count of district , state and session for looping
    districtCount! : number
    stateCount!:number;
    sessionCount!:number;

    state_id!:number;
    district_id!:number;

    //used to store pincode for API
    pincode!:number;

    //Varibles for finding today Date
    today!:Date;
    date!:number;
    month!:number;
    year!:number;
    finalDate!:string;


    vaccine = ["COVAXIN","COVISHIELD","SPUTNIK V"]
    ageGroup = [18,45];
    vaccineType!:string;
    ageLimit!:number;
    //myArray = [{state_id:1,state_name:"Andaman and Nicobar Islands"},{state_id:2,state_name:"Andhra Pradesh"},{state_id:3,state_name:"Arunachal Pradesh"},{state_id:4,state_name:"Assam"},{state_id:5,state_name:"Bihar"},{state_id:6,state_name:"Chandigarh"},{state_id:7,state_name:"Chhattisgarh"},{state_id:8,state_name:"Dadra and Nagar Haveli"},{state_id:37,state_name:"Daman and Diu"},{state_id:9,state_name:"Delhi"},{state_id:10,state_name:"Goa"},{state_id:11,state_name:"Gujarat"},{state_id:12,state_name:"Haryana"},{state_id:13,state_name:"Himachal Pradesh"},{state_id:14,state_name:"Jammu and Kashmir"},{state_id:15,state_name:"Jharkhand"},{state_id:16,state_name:"Karnataka"},{state_id:17,state_name:"Kerala"},{state_id:18,state_name:"Ladakh"},{state_id:19,state_name:"Lakshadweep"},{state_id:20,state_name:"Madhya Pradesh"},{state_id:21,state_name:"Maharashtra"},{state_id:22,state_name:"Manipur"},{state_id:23,state_name:"Meghalaya"},{state_id:24,state_name:"Mizoram"},{state_id:25,state_name:"Nagaland"},{state_id:26,state_name:"Odisha"},{state_id:27,state_name:"Puducherry"},{state_id:28,state_name:"Punjab"},{state_id:29,state_name:"Rajasthan"},{state_id:30,state_name:"Sikkim"},{state_id:31,state_name:"Tamil Nadu"},{state_id:32,state_name:"Telangana"},{state_id:33,state_name:"Tripura"},{state_id:34,state_name:"Uttar Pradesh"},{state_id:35,state_name:"Uttarakhand"},{state_id:36,state_name:"West Bengal"}];

  constructor(private vaccineService: VaccineService) { }

  ngOnInit(): void {
    this.searchByPin = false;
    this.searchByDistrict = true;
    this.showSearchedRecordsByDistrict=false;
    this.showSearchedRecordsByPincode=false;
    this.showSearchedNoRecords=false;

    this.today = new Date();
    //console.log(this.today)
    this.date = this.today.getDate();
    this.month = this.today.getMonth()+1;
    this.year = this.today.getFullYear();
    this.finalDate = this.date + '-' + this.month +'-' +this.year;

    this.vaccineType = "COVAXIN";
    this.ageLimit = 18;
    //console.log(this.finalDate);
    this.getStates();
  }
  //Show Search By District Input Form
  showFindByDistrictForm()
  {
    this.searchByDistrict = true;
    this.searchByPin = false;
  }

   //Show Search By Pincode Input Form
  showFindByPinForm()
  {
    this.searchByPin = true;
    this.searchByDistrict = false;
  }

  // Get States from API
  getStates():void
  {
    this.vaccineService.getStates().subscribe(
      response => {
        if(response){
        this.allstates = response
        this.stateCount = this.allstates.states.length;
        for(var i=0;i< this.stateCount; i++)
        {
          this.myStateArray[i] = this.allstates.states[i];
        }
        }
      });
  }

  //On Selecting State Find Districts
  onSelectState(event:any)
  {
    this.mySessionArray=[];
    this.state_id = event.target.value;

    this.vaccineService.getDistricts(this.state_id).subscribe(
      response => {
        if(response){
      this.allDistricts = response
      this.districtCount  = this.allDistricts.districts.length;
      for(var i=0;i<this.districtCount;i++)
      {
          this.myDistrictsArray[i] = this.allDistricts.districts[i];
      }
    }
      });
  }


  //On Selecting District Find Vaccine Slots
  onSelectDistrictFindSlot(event:any)
  {
    this.pincode!= null;
    this.mySessionArray=[];
    this.mySessionArray2=[];
      this.district_id = event.target.value;
      this.vaccineService.getSessionByDistrict(this.district_id,this.finalDate)
        .subscribe(response=> {

          if(response){

          this.allSessions = response
          this.sessionCount = this.allSessions.sessions!.length;
          console.log(this.sessionCount);
          for(var i=0;i<this.sessionCount;i++)
          {
            this.mySessionArray[i] = this.allSessions.sessions![i];
          }
          if(this.sessionCount>0)
          {
            this.showSearchedRecordsByDistrict = true;
            this.showSearchedRecordsByPincode = false;
            this.showSearchedNoRecords = false;
          }
          else{
            this.showSearchedRecordsByDistrict = false;
            this.showSearchedRecordsByPincode = false;
            this.showSearchedNoRecords = true;
          }
          console.log(this.mySessionArray);////COmment this
        }
        });
  }

  //For filtering output based on vacccine selected
  onVaccineSelected(event:any)
  {
    this.vaccineType = event.target.value;
  }

  //For filtering output based on Age Group Selected
  onAgeGroupSelected(event:any)
  {
    this.ageLimit = event.target.value;
    //console.log(this.ageLimit);
  }

    //Find Slot By Pincode
    findByPincode(event:any)
    {
        this.mySessionArray2=[];
        this.pincode = event.target.value;
        // console.log(this.pincode) ////COmment this
        if(this.pincode.toString().length==6)
        {
          this.pincode = event.target.value;
          this.vaccineService.getSessionByPin(this.pincode,this.finalDate)
          .subscribe(response=> {
            this.allSessions2 = response

            this.sessionCount = this.allSessions2.sessions!.length;
            console.log(this.sessionCount);
            for(var i=0;i<this.sessionCount;i++)
            {
              this.mySessionArray2[i] = this.allSessions2.sessions![i];
            }
            if(this.sessionCount>0)
            {
              this.showSearchedRecordsByDistrict = false;
              this.showSearchedRecordsByPincode = true;
              this.showSearchedNoRecords = false;
            }
            else{
              this.showSearchedRecordsByDistrict = false;
              this.showSearchedRecordsByPincode = false;
              this.showSearchedNoRecords = true;
            }
            console.log(this.mySessionArray2);////COmment this
          });
        }
    }

}
