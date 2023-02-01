import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  

  constructor(private http:HttpClient) { }

  postRestaurant(data:any){
    return this.http.post("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getRestaurant(){
    return this.http.get("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
  }))

  }
  updateRestaurant(data:any,id:number){
    return this.http.put("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteRestaurant(id:number){
    return this.http.delete("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res
  }))
  }
}
