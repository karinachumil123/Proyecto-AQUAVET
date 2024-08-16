import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule} from '@angular/material/dialog'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { provideNativeDateAdapter } from '@angular/material/core'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select';
import { NgFor } from '@angular/common';
import { IPuestoEmpleado } from '../../core/models/IPuestoEmpleado.interce';
import { IEstadoEmpleado } from '../../core/models/IEstadoEmpleado.interface';
import { BaseService } from '../../core/services/base-api.service';
import { IRegisterEmployee } from '../../core/models/IRegisterEmployee.interface';


@Component({
  selector: 'app-edit',
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
    NgFor,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  providers:[provideNativeDateAdapter()]
})
export class EditComponent {
  baseService = inject(BaseService)
  listPuestos: IPuestoEmpleado[] | undefined;
  listEstadosEmpleados: IEstadoEmpleado[] | undefined 
  empleado :IRegisterEmployee | undefined;

  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any){}
  
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
    salario : ['', [Validators.required] ],
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

      this.baseService.getById("Employees", this.data.id)
        .subscribe(data => {
          if (data.isSucess) {
            this.empleado = data.value;
            this.registerEmployeeForm.patchValue({
              primerNombre: this.empleado?.primer_Nombre,
              segundoNombre: this.empleado?.segundo_Nombre,
              otrosNombres: this.empleado?.otro_Nombre,
              primerApellido: this.empleado?.primer_Apellido,
              segundoApellido: this.empleado?.segundo_Apellido,
              telefono : this.empleado?.telefono,
              email: this.empleado?.email,
              fNacimiento: this.empleado?.fecha_Nacimiento.toString(),
              direccion: this.empleado?.direccion,
              genero: this.empleado?.genero,
              salario: this.empleado?.salario.toString(),
              puesto : this.empleado?.iD_Puesto.toString(),
              estado : this.empleado?.iD_Empleado?.toString()
            });
          }
        })    
  }

  onSubmit(){
    if (this.registerEmployeeForm.valid) {
      const fechaNacimiento = new Date(this.registerEmployeeForm.get("fNacimiento")?.value ?? '');

      const employee: IRegisterEmployee ={
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

    this.baseService.editItem('Employees', Number(this.empleado?.iD_Empleado), employee)
    .subscribe( data => {
      if (data.isSucess){
        console.log(data.value);
      }
    });
    }
  }

  toNumber(value:any){
    const num = Number(value);
    return isNaN(num) ? 0 : num
  }




}
