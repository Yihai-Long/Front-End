import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../EmployeeService/employee-service';
import { Employee } from '../employee-interface';
import { ActivatedRoute } from "@angular/router";
import {Router} from '@angular/router';
import { NavService } from '../../navbar/nav.service' ;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  employee: Employee;
  empId:number;
  emp:any;

  tableColumns: string[] = ['ID','Name', 'Password','Phone Number','Supervisor'];
  constructor(public nav: NavService,private formBuilder: FormBuilder, private employeeService: EmployeeService, private route:ActivatedRoute,private router: Router) {
    this.route.params.subscribe(params=>this.empId=params.id);
   }
  ngOnInit() {
    this.nav.show();
    this.employeeService.getById(this.empId).subscribe(employee => this.employee = employee);
    this.searchForm = this.formBuilder.group({
        name: ['', Validators.required],
        id: [this.empId, Validators.required],
        password: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        supervisors: ['', Validators.required]
 
    });

  }
  
    onSubmit(){
      this.updateEmployees();
    }

    updateEmployees() {
      
          const newEmployee: Employee = {
            name : this.searchForm.controls.name.value,
            password: this.searchForm.controls.password.value,
            phoneNumber: this.searchForm.controls.phoneNumber.value,
            supervisors: this.searchForm.controls.supervisors.value,
          };

      this.employeeService.updateEmployees(this.empId,newEmployee).subscribe(
        (result) => {
         
          this.emp = result;
          setTimeout(() => {
            this.router.navigate(['/view']);
          }, 2000);
        }
      );
    } 

  
}

