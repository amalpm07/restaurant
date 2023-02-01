import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServerService } from '../server.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent {
  formValue!: FormGroup;
  restaurentModelObj: RestaurantData = new RestaurantData;
  allRestaurentData: any;
  showAdd!:boolean
  showbtn!:boolean
  constructor(private formBuilder: FormBuilder, private api: ServerService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobail: [''],
      address: [''],
      services: ['']
    })
this.getAllData()
  }
  clickAddResto(){
    this.formValue.reset()
    this.showAdd=true
    this.showbtn=false
  }
  addResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobail = this.formValue.value.mobail;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;
    
    this.api.postRestaurant(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent RecordsAdded Successfullly");
      let ref=document.getElementById('clear')
      ref?.click()
      this.formValue.reset()
    this.getAllData()
    },
      err => {
        alert("invalid")
      }
    )
  }
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurentData=res;
    })
  }

  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Restaurent Records Deleted")
      this.getAllData()
    })
  }
  onEdit(data:any){
    this.showAdd=false
    this.showbtn=true
    this.restaurentModelObj.id=data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobail'].setValue(data.mobail);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobail = this.formValue.value.mobail;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurant Record upadated")
      let ref=document.getElementById('clear')
      ref?.click()
      this.formValue.reset()
    this.getAllData()
    })
  }
}
