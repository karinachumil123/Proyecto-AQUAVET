import { Component, OnInit, inject } from '@angular/core';
import { BtnEditarComponent } from '../../shared/components/btn/btn-editar/btn-editar.component';
import { BtnEliminarComponent } from '../../shared/components/btn/btn-eliminar/btn-eliminar.component';
import { BaseService } from '../../core/services/base-api.service';
import { Iuser } from '../../core/models/IUser.interface';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    BtnEditarComponent,
    BtnEliminarComponent,
    NgFor,
    NgIf,
    NgForOf,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  baseService = inject(BaseService)
  listUsers: Iuser[] |undefined;
  
  constructor(public dialog: MatDialog){}

  ngOnInit(){
    this.getAllUsers()
  }


  getAllUsers(){
    this.baseService.getAll("User")
      .subscribe(u => {
        if (u.isSucess) {
          this.listUsers= u.value
        }
      })
  }

  deleteUser(id:number){
    this.baseService.deleteItem('User', Number(id))
    .subscribe(data => {
      if (data.isSucess){
        this.getAllUsers()
      }
    })
  }

  openDialogCreate(){
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe( data=>{
      setTimeout(() => {
        this.getAllUsers()
      }, 300);
    } )
  }

}
