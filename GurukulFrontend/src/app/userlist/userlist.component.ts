import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { NzOptionComponent, NzSelectSizeType } from 'ng-zorro-antd/select';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  
 
  switchValue = true;
  public users: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }
 
  selectedProvince = 'All';
  provinceData = ['All', 'Student', 'Parent'];



  getUserList(): void {
    const formData: any = { };
    this.apiService.UserList(formData).subscribe(
      (response: any) => {    
        this.users = response.data;
            // this.applyRoleFilter();
        console.log("responssssseeeee>>>",response)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}