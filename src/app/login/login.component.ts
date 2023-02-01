import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup
constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){}

ngOnInit():void{
this.loginForm=this.fb.group({
  email:[''],
  password:['']
})
}
login(){
this.http.get("http://localhost:3000/signup").subscribe((res:any)=>{
  const user =res.find((a:any)=>{
    return a.email ===this.loginForm.value.email && a.password === this.loginForm.value.password

  })
  if(user){
    alert("login is successfull")
    this.loginForm.reset()
    this.router.navigateByUrl("restaurant")
  }
  else{
    alert("user not found")
  }
},
err=>{
  alert("server side")
}
)
}
}



