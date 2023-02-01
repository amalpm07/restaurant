import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder ,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!:FormGroup
  constructor(private fb:FormBuilder, private http:HttpClient,private router:Router){}

  ngOnInit(): void{
    this.signupForm=this.fb.group({
      name:[''],
      email:[''],
      mobail:[''],
      password:['']
    })
  }
signup(){
  this.http.post("http://localhost:3000/signup",this.signupForm.value).subscribe(res=>{
    alert("Register Successfull")
    this.signupForm.reset();
    this.router.navigateByUrl('login')
  },
  errr=>{
    alert('invalid')
  }
  )
}
}
