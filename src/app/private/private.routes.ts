import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { EmployeeComponent } from "./employee/employee.component";
import { UserComponent } from "./user/user.component";


export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'usuarios',
        component: UserComponent
      },
      {
        path: 'empleados',
        component: EmployeeComponent
      }
    ]
  },
  // {
  //   path:'',
  //   redirectTo: '/catalogo/empleados'
  // }
];