import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {EmployeeComponent} from './employee/employee-component';
import {WelcomeComponent} from './welcome/welcome.component';
import {SaveEmployeeComponent} from './employee/save-employee/save-employee.component';
import {SearchComponent} from'./employee/search/search.component';

export const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: SaveEmployeeComponent },
  { path: 'search/:id', component: SearchComponent },
  {
    path: 'view',
    component: EmployeeComponent,
    data: { title: 'Employee Details' }
  },
  { path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }



];
