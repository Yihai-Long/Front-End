import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../EmployeeService/employee-service';
import { Employee } from '../employee-interface';
import {Router} from '@angular/router';
import { NavService } from '../../navbar/nav.service' ;

@Component({
    selector: 'app-save-employee',
    templateUrl: './save-employee.component.html',
    styleUrls: ['./save-employee.component.css']
})
export class SaveEmployeeComponent implements OnInit {
    registerForm: FormGroup;
    
    submitted = false;

    emp: any;

    constructor(public nav: NavService,private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) { }

    ngOnInit() {
        this.nav.show();
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
            password: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            supervisors: ['', Validators.required]
        });
    }

    

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        } else {
            // server call POST to add details
          this.registerNewEmployee();

        }
    }

/*
    Method to register a new employee
*/
    registerNewEmployee() {
      /*getting values from the form */
          const newEmployee: Employee = {
            name : this.registerForm.controls.name.value,
            password: this.registerForm.controls.password.value,
            phoneNumber: this.registerForm.controls.phoneNumber.value,
            supervisors: this.registerForm.controls.supervisors.value,
          };

      this.employeeService.registerEmployee(newEmployee).subscribe(
        (result) => {
         console.log(`Add employee result: ${result}`);
          this.emp = result;
          setTimeout(() => {
            this.router.navigate(['/view']);
          }, 2000);
        }
      );
    }
}
