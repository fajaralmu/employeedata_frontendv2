import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from './models/page-list';
import { Employee } from './models/employee';
import { EmployeeDTO } from './models/employee-dto';
import { TableRequest } from './models/table-request';
import { Position } from './models/position';
// const host = 'https://employeedata2.herokuapp.com/employee/';
const host = 'http://localhost:8080/employeedata/employee/';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployeeList(orderBy:string, orderType:string):Observable<PageList>{
    const req:TableRequest = {
      orderBy:orderBy,
      orderType:orderType,
      page:0,
      limit:0
    }
    return this.http.post<PageList>(host+'index', req);
  }
  insert(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(host+'insert', employee);
  }
  update(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(host+'update', employee);
  }
  delete(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(host+'delete', employee);
  }
  addEdit(employeeId?:number ):Observable<EmployeeDTO>{
    const url = employeeId?(host+'addEdit/'+employeeId):(host+'addEdit');
    return this.http.get<EmployeeDTO>(url);
  }

  //
  insertRole(position:Position):Observable<Position>{
    return this.http.post<Position>(host+'insertposition', position);
  }
}
