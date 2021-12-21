import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {
  // otp!: string;
  // verifyotp!: string;
  // lastFourotp!: string;
  // phoneNo!: string;
  OTPPattern = "[0-9]{10}$";
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,public http: HttpClient){
    this.form = fb.group({
      otp: ['', [Validators.required, Validators.pattern("[0-9]{6}$")]]
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
