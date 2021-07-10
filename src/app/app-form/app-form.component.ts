import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../employee.service';
import { Position } from './../models/position';
import { Employee } from './../models/employee';
import { ActivatedRoute, ParamMap, Route, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from './../app.component';
import { EmployeeDTO } from './../models/employee-dto';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {
  state: Observable<object> | undefined;
  title: string = "Edit Data Karyawan";
  positions: Position[]|undefined= undefined;
  employee: Employee | undefined = new Employee();
  employeeId: number | undefined;
  constructor(public activatedRoute: ActivatedRoute, 
    private router: Router, private employeeService: EmployeeService, 
    private app: AppComponent) {
      
    this.employeeId = (this.router.getCurrentNavigation()?.extras?.state?.employeeId); // should log out 'bar'
    console.debug("EMP id: ", this.employeeId);
  }

  ngOnInit(): void {
    this.loadRecord();

  }
  loadRecord(): void {
    if (this.employeeId) {
      this.employee = undefined;
    }
    this.employeeService.addEdit(this.employeeId).
      subscribe((employeeDTO) => {
        this.handleGetRecord(employeeDTO);
      }, (error)=>{
        this.app.showInfo("Operasi gagal");
      });
  }
  handleGetRecord(employeeDTO: EmployeeDTO): void {
    this.positions = employeeDTO.positionList;
    if (this.employeeId && !employeeDTO.employee) {
      this.app.showInfo("data dengan id: " + this.employeeId + " tidak ditemukan").then(() => {
        this.employee = new Employee();
      });
    }
    if (employeeDTO.employee) {
      this.employee = employeeDTO.employee;
    }
  }
  validateEmail():boolean {
    if (!this.employee) 
      return false;
   
    const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (exp.test(this.employee.email??"")) 
      return true;
    
    return false;
  }
  submit(): void {
    if (!this.validateEmail()) {
      this.app.showInfo("Invalid email");
      return;
    }
    this.app.showConfirm("Apakah Anda akan menyimpan data ini?").then((ok) => {
      if (ok) this.doSubmit();
    })
  }
  private doSubmit = () => {
    if (!this.employee) return;
    if (this.employeeId && this.employee.id && this.employee.id > 0) {
      this.employeeService.update(this.employee)
        .subscribe(this.submitSuccess, this.errorSubmit);
      return;
    }
    this.employeeService.insert(this.employee)
      .subscribe(this.submitSuccess, this.errorSubmit);
  }
  errorSubmit = (error:any) => {
    this.app.showInfo("Gagal menyimpan data").then(()=>{});
  }
  private submitSuccess = (employee: Employee) => {
    this.app.showInfo("Sukses").then(() => {
      this.router.navigateByUrl("/index");
    })
  }
  updatePosition(position: Position) {
    if (!this.employee) return;
    this.employee.position = position;
  }

}
