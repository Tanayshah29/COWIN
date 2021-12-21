import { LoginServiceService } from 'src/app/services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  // phoneNo: string = "";
  // otp: string  = "123456";
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,public http: HttpClient, private loginService: LoginServiceService){
    this.form = fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}$")]]
    })
  }
  ngOnInit(){}

    get f(){
    return this.form.controls;
    }

  submit(){
    console.log(this.form.value);
  }



}

  // generateOTPToken(){

  //   return this.phoneNo.slice(this.phoneNo.length - 4);
  //   console.log(this.phoneNo.slice(this.phoneNo.length - 4));
  // }
  // onGetOTP(phoneNo: string){
  //   this.phoneNo = phoneNo;
  //   sessionStorage.setItem('phoneNo', this.phoneNo);
  //   sessionStorage.setItem('OTP', this.otp);
  //   console.log(this.phoneNo);
  //   console.log(this.otp);
  // }



