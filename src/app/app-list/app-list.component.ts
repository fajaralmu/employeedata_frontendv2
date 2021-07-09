import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './../employee.service';
import { Employee } from './../models/employee';
import { PageList } from './../models/page-list';
import { AppComponent } from './../app.component';
import { TableRequest } from './../models/table-request';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  tableHeaders:Array<any> = [
    { label:"Nama", name:"name" }, {label:'Email',name:'email'},
    { label:"Alamat", name:"address" }, { label:"Tanggal Lahir", name:"birthDate" },
    { label:"Jabatan", name:"position" }, { label:"NIP", name:"idNumber" }, { label:'Jenis Kelamin', name:'gender' }
  ];
  
  loading:boolean = false;
  tableRequest:TableRequest = new TableRequest();
  constructor(private employeeService:EmployeeService, private router:Router, private app:AppComponent) { }
  employees:Employee[] | undefined= undefined;
  ngOnInit(): void {
    this.loadItems();
  }
  loadItems():void {
    this.loading = true;
    this.employeeService.getEmployeeList(this.tableRequest)
    .subscribe((pageList:PageList)=>{
      this.handleGetItems(pageList);
    }, (err)=> this.handleError(err));
  }
  goToPage(page:number):void {
    
    this.tableRequest.page = page;
    this.loadItems();
  }
  private handleGetItems(pageList:PageList): void {
    this.employees = pageList.content;
    this.loading = false;
    this.tableRequest.page = pageList.number;
    this.tableRequest.limit = pageList.size;
    this.tableRequest.totalData = pageList.totalElements;
  }
  sortBy(key:string) :void {
    if (this.tableRequest.orderBy != key) {
      this.tableRequest.orderBy = key;
      this.tableRequest.orderType = "asc";
      this.loadItems();
      return;
    }
    this.tableRequest.orderType = this.tableRequest.orderType == "asc"?"desc":"asc";
    this.loadItems();
  }
  handleError(error:any) {
    this.loading = false;
    console.debug("Error: ", error);
    this.app.showInfo("Operasi gagal");
  }
  deleteRecord(employee:Employee):void {
    this.app.showConfirm("Apakah Anda akan menghapus data ini?").then((ok)=>{
      if (!ok) return;
        this.employeeService.delete(employee)
        .subscribe((response)=>this.loadItems(), (err)=> this.handleError(err));
    });
  }
  showUpdateForm(employee:Employee):void {
    this.app.showConfirm("Apakah Anda akan mengedit data ini?").then((ok)=>{
      if (ok) {
        this.router.navigate(['addEdit'], { state: { employeeId: employee.id} });
      }
    });
  }

}
