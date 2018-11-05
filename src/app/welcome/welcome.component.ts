import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/EmployeeService/employee-service';
import { Employee } from '../employee/employee-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavService } from '../navbar/nav.service' ;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  loginForm: FormGroup;
  showNav=true;
  constructor(public nav: NavService,private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) { }
  
  ngOnInit() {
    this.nav.hide();
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    
  });
  }
  searchEmployees() {

    this.employeeService.checkLogin(this.loginForm.controls.name.value
      ,this.loginForm.controls.password.value)
    .subscribe( (exists) => {if(exists){
      this.router.navigate(['view']);
    }else { alert("Your user name or ID does not match our record")}
  }
    );
  }

  onSubmit(){

    this.searchEmployees();
  
    
    }
  }


  





