import { Component, OnInit } from '@angular/core';
import { NavbarTopComponent } from '../../shared/components/auth/navbar-top/navbar-top.component';
import { ReactiveFormsModule , FormBuilder, Validators} from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NavbarTopComponent, 
    ReactiveFormsModule, 
    NgIf,
    LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private sAuth: AuthService){}

  stateLogin:boolean = false;


  ngOnInit(): void {
    if (this.sAuth.isAuthenticated()) {
      this.router.navigate(['/catalogo']);
    }
  }

  loginForm =  this.formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required] ],
  })


  onSubmit(){

    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return
    }

    const email = this.loginForm.value.email
    const password = this.loginForm.value.password

    Swal.fire({
      title:'',
      text: 'Espere por favor...'
    })
    Swal.showLoading();

    this.sAuth.login( email!,password!)
      .subscribe((data) => {
        
        if (data.isSucess) {
          Swal.fire({
            icon: "success",
            title: "",
            text: "Accesiendo al sistema",
            timer: 1000
          })
          this.router.navigate(['/catalogo'])
        }else{
          Swal.fire({
            icon: "error",
            title: "",
            text: "Correo o contraseña incorrecta",
            timer: 3000
          }) 
        }
      })
  }



  getErrorMessage(formControl:string){
    const control  = this.loginForm.get(formControl);
    if (control?.hasError('required')) {
      return 'El campo es requerido'
    }
    else if (control?.hasError('email')){
      return 'Es necesario un correo electrónico'
    }
    return
  }

}
