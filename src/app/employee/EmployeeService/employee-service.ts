import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { EMPLOYEEURL } from '../../shared/constants';
import { Employee } from '../employee-interface';


@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) { }

  /*GET: service to get the all employees details*/
  getEmployeeDetails(): Observable<any> {
    // call to server
    return this.http.get(EMPLOYEEURL + '/getData');
  }
  /*ADD: service to register an employee */
  registerEmployee(newEmployee: Employee) {
    // call to server
    return this.http.post(EMPLOYEEURL + '/addEmployee', newEmployee);
  }

  /* DELETE: service to delete an employee */
  deleteEmployee(id: number): Observable<{}>{
    //call to server
    const url = `${EMPLOYEEURL}/deleteEmployee/${id}`; 
    const options = {responseType: 'text' as 'text'};
    return this.http.post(url, options );
  }

  getEmployees(id: number, name: string): Observable<any> {
    return this.http.get(EMPLOYEEURL+`/getData/${id}/${name}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(EMPLOYEEURL+`/getData/${id}`);
  }

  checkLogin(name:string,password:string): Observable<any> {
    return this.http.get(`http://localhost:8090/practice/common/loginPage/${name}/${password}`);
  }


  updateEmployees(id:number,newEmployee: Employee){
    return this.http.post(EMPLOYEEURL+`/update/${id}`,newEmployee);
  }




}

