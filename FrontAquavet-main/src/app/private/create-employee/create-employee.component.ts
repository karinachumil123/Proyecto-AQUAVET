import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule} from '@angular/material/dialog'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { provideNativeDateAdapter } from '@angular/material/core'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select';
import { BaseService } from '../../core/services/base-api.service';
import { IEstadoEmpleado } from '../../core/models/IEstadoEmpleado.interface';
import { IPuestoEmpleado } from '../../core/models/IPuestoEmpleado.interce';
import { IRegisterEmployee } from '../../core/models/IRegisterEmployee.interface';
import Swal from 'sweetalert2';

import { NgFor } from '@angular/common';
@Component({
  selector: 'app-create-employee',
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
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
  providers:[provideNativeDateAdapter()]
})
export class CreateEmployeeComponent implements OnInit {
  baseService = inject(BaseService)
  listPuestos: IPuestoEmpleado[] | undefined;
  listEstadosEmpleados: IEstadoEmpleado[] | undefined 

  constructor(private formBuilder: FormBuilder){}

  registerEmployeeForm =  this.formBuilder.group({
    primerNombre : ['', [Validators.required]],
    segundoNombre : [''],
    otrosNombres : [''],
    primerApellido : ['', [Validators.required] ],
    segundoApellido : ['', [Validators.required] ],
    telefono : ['', [Validators.required] ],
    email : ['', [Validators.required, Validators.email] ],
    fNacimiento : ['', [Validators.required] ],
    direccion : ['', [Validators.required] ],
    genero : ['', [Validators.required] ],
    salario : ['', [Validators.required, Validators.maxLength(5)] ],
    puesto : ['', [Validators.required] ],
    estado: ['', [Validators.required] ],
  })


  ngOnInit(): void {
    this.baseService.getAll('puesto')
      .subscribe(data => {
        if (data.isSucess) {
          this.listPuestos = data.value
        }
      })

      this.baseService.getAll('estadoEmpleados')
        .subscribe(data => {
          if (data.isSucess) {
            this.listEstadosEmpleados = data.value
          }
        })
  }

  onSubmit(){
    if (this.registerEmployeeForm.valid) {
      const fechaNacimiento = new Date(this.registerEmployeeForm.get("fNacimiento")?.value ?? '');

      const employee: IRegisterEmployee ={
        iD_Empleado :0,
        primer_Nombre: this.registerEmployeeForm.get("primerNombre")?.value,
        segundo_Nombre: this.registerEmployeeForm.get("segundoNombre")?.value,
        primer_Apellido: this.registerEmployeeForm.get("primerApellido")?.value,
        segundo_Apellido: this.registerEmployeeForm.get("segundoApellido")?.value,
        otro_Nombre: this.registerEmployeeForm.get("otrosNombres")?.value,
        telefono: this.registerEmployeeForm.get("telefono")?.value,
        fecha_Nacimiento:  fechaNacimiento,
        fecha_Contratacion: new Date(),
        email: this.registerEmployeeForm.get("email")?.value,
        direccion:  this.registerEmployeeForm.get("direccion")?.value,
        genero: this.registerEmployeeForm.get("genero")?.value,
        salario:  this.toNumber(this.registerEmployeeForm.get("salario")?.value),
        iD_Puesto :this.toNumber(this.registerEmployeeForm.get("puesto")?.value),
        iD_EstadoEmpleado :this.toNumber(this.registerEmployeeForm.get("estado")?.value)
      };

    this.baseService.postItem('Employees', employee)
    .subscribe( data => {
        if (data.isSucess) {
          Swal.fire({
            icon: "success",
            title: "",
            text: "Empleado Creado",
            timer: 1000
          })
          }
          else{
            Swal.fire({
              icon: "error",
              title: "",
              text: "Error al registrar el empleado",
              timer: 1000
            })
          }
    });



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
