import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';
import { EmployeeService } from './../employee.service';
import { Position } from './../models/position';

@Component({
  selector: 'app-app-form-position',
  templateUrl: './app-form-position.component.html',
  styleUrls: ['./app-form-position.component.css']
})
export class AppFormPositionComponent implements OnInit {
  title = "Tambah Jabatan";
  position:Position = new Position();
  constructor(private employeeService: EmployeeService, 
    private app: AppComponent) { }

  
  ngOnInit(): void {
  }
  submit(): void {
    this.app.showConfirm("Apakah Anda akan menyimpan data ini?")
    .then((ok)=>{
      if (ok) {this.doSubmit();}
    })
  }
  private doSubmit(): void {
    this.position.id = undefined;
    this.employeeService.insertRole(this.position)
    .subscribe((response)=>{
      this.app.showInfo("Success").then(()=>{
        this.position = new Position();
      })
    }, (error)=>{
      this.app.showInfo("Operasi gagal. Silakan coba lagi").then(()=>{})
    })
  }

}
