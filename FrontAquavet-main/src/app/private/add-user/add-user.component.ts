import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, } from '@angular/material/select';
import { BaseService } from '../../core/services/base-api.service';
import { IEstadoEmpleado } from '../../core/models/IEstadoEmpleado.interface';
import { IEmpoyeesInfo } from '../../core/models/IEmpoyeesInfo.interface';
import { IRole } from '../../core/models/IRole.interface';
import { ILoginUser } from '../../core/models/ILoginUser.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatDialogModule,

    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{
  baseService = inject(BaseService)
  listEmpleados: IEmpoyeesInfo[] | undefined 
  listRoles: IRole[]| undefined;

  constructor(private formBuilder: FormBuilder){}

  registerUserForm =  this.formBuilder.group({
    idEmpleado : ['', [Validators.required]],
    email : ['',[Validators.required]],
    id_Role : ['',[Validators.required]],
    password : ['', [Validators.required] ],
    // ConfirPassword : ['', [Validators.required] ],
  })

  ngOnInit(): void {
    this.getAllEmployees();
    this.getRoles();

    this.registerUserForm.get('idEmpleado')?.valueChanges
      .subscribe(id => {
        const empleado = this.listEmpleados?.find(emp => emp.iD_Empleado == this.toNumber(id))
        if (empleado) {
          this.registerUserForm.patchValue({
            email: empleado.email
          })
        }
      })
  }

  getAllEmployees(){
    this.baseService.getAll('User/empleadosSinUsuarios')
      .subscribe(data =>{
        if (data.isSucess) {
          this.listEmpleados = data.value;
        }        
      });
  }

  getRoles(){
    this.baseService.getAll("RolesEmployees")
      .subscribe(data => {
        if (data.isSucess) {
          this.listRoles = data.value;
        }
      })
  }

  onSubmit(){
    if (this.registerUserForm.valid) {
      const userLogin :ILoginUser = {
        Email: this.registerUserForm.get('email')?.value,
        Password: this.registerUserForm.get('password')?.value,
        RoleID: this.toNumber(this.registerUserForm.get("id_Role")?.value),
        EmpleyeeID :this.toNumber(this.registerUserForm.get("idEmpleado")?.value),
      }

      this.baseService.postItem("User/create", userLogin)
        .subscribe(data => {
          if (data.isSucess) {
          Swal.fire({
            icon: "success",
            title: "",
            text: "Usuario Creado",
            timer: 1000
          })
          }
          else{
            Swal.fire({
              icon: "error",
              title: "",
              text: "Error al registrar el usuario",
              timer: 1000
            })
          }
      })
    }else{
      Swal.fire({
        icon: "error",
        title:'',
        text: 'Datos requeridos',
        timer: 3000
      })
    }
    
  }

  toNumber(value:any){
    const num = Number(value);
    return isNaN(num) ? 0 : num
  }
}
