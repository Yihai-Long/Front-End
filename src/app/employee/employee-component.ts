import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './EmployeeService/employee-service';
import { Employee } from './employee-interface';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavService } from '../navbar/nav.service' ;
// RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MessagesService } from '../shared/messages-service/messages.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee-component.html',
  styleUrls: ['./employee-component.css']
})
export class EmployeeComponent implements OnInit {

  searchForm: FormGroup;

  tableColumns: string[] = ['ID','Name', 'Phone Number','Supervisor','Delete','Edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Employee>;
  employees: any;
  tableData: any;
  dialogRef: MatDialogRef<DialogComponent>;
  submitted= false;
  private idColumn = 'empId';
  private dsData: any;
  constructor(public nav: NavService,private formBuilder: FormBuilder,private employeeService: EmployeeService, private router: Router,
    private dialog: MatDialog, private messagesService: MessagesService) { } // Dependency injection of service module

  ngOnInit() {
    this.nav.show();
    this.tableData = [];
    this.fetchEmployeeDetails();
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    
  });
  }
  get f() { return this.searchForm.controls; }
  /* Function to retrieve employee details */
  fetchEmployeeDetails() {
    /*subscribing to the observable response from service method*/
    this.employeeService.getEmployeeDetails()
      .subscribe(
        (result) => {
          this.employees = result; // Table data binding the bootstrap table
          this.dataSource = new MatTableDataSource(this.employees); // Table data binding the angular material
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 10);
        }
      );

  }

  searchEmployees() {

    this.employeeService.getEmployees(this.searchForm.controls.id.value,this.searchForm.controls.name.value)
      .subscribe(employees => this.employees = employees);
  }

    onSubmit(){
      this.submitted=true;
      this.searchEmployees();
    }

  route() {
    this.router.navigate(['/register']);
  }

  // function to delete employee
  deleteEmployee(empId: number) {

    this.dialogRef = this.dialog.open(DialogComponent, {
      height: '200px',
      width: '500px',
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result){
      this.employeeService.deleteEmployee(empId).subscribe( deleted => {
       if(deleted){
        this.success();
        // Refresh DataTable to remove row.
        this.deleteRowDataTable(empId, this.idColumn, this.paginator, this.dataSource);
       }else { alert("Failed to delete.") }
   }
      );
    
    }
   
    });

  }

  // Remove the deleted row from the data table. Need to remove from the downloaded data first.
  private deleteRowDataTable(recordId, idColumn, paginator, dataSource) {
    this.dsData = dataSource.data;
    const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  private success() {
    this.messagesService.openDialog('Success', 'Employee has been deleted');
  }


  navEdit(empId: number, name: string){
    this.router.navigate([`/search/${empId}`]);

  }

}



