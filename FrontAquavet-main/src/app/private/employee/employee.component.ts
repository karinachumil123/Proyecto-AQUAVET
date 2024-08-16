import { Component, OnInit, inject } from '@angular/core';
import { BaseService } from '../../core/services/base-api.service';
import { IEmpoyeesInfo } from '../../core/models/IEmpoyeesInfo.interface';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { BtnEditarComponent } from '../../shared/components/btn/btn-editar/btn-editar.component';
import { BtnEliminarComponent } from '../../shared/components/btn/btn-eliminar/btn-eliminar.component';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule} from '@angular/material/dialog'
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ 
    NgFor, 
    NgIf, 
    NgForOf,
    BtnEditarComponent,
    BtnEliminarComponent,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{
  baseService = inject(BaseService)
  employees : IEmpoyeesInfo[] | undefined;

  constructor(public dialog: MatDialog){}

  ngOnInit(){
    this.getAllEmployees()
  }


  getAllEmployees(){
    this.baseService.getAll('Employees')
      .subscribe(data =>{
        if (data.isSucess) {
          this.employees = data.value;
        }        
      });
  }

  deleteEmployee(id:Number) {
    this.baseService.deleteItem('Employees', Number(id))
      .subscribe(data => {
        if (data.isSucess){
          this.getAllEmployees();
        }
      })
  }


  editEmployee(id:Number){
    const dialogRef = this.dialog.open(EditComponent, {
      data: {id: Number(id)},
    });
    dialogRef.afterClosed().subscribe(
      result => {
        setTimeout(() => {
          this.getAllEmployees();
        }, 700);
        
      }
    )
  }

  openDialogCreate(){
    const dialogRef = this.dialog.open(CreateEmployeeComponent);
    dialogRef.afterClosed().subscribe( data=>{
      setTimeout(() => {
        this.getAllEmployees();
      }, 700);
    } )
  }



}
