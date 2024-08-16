import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { BaseService } from '../../../../core/services/base-api.service';
import { IUserProfile } from '../../../../core/models/IUserProfile.interface';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService)
  baseService = inject(BaseService)
  userProfile:IUserProfile | undefined;

  constructor(){}

  logout(){
    this.authService.logout();
  }

  getMyInformation(){
    this.baseService.getFirstOrDefault('user/perfil')
      .subscribe(data => {
        if (data.isSucess){
          this.userProfile=  data.value;          
        }
      })
  }

  ngOnInit(): void {
    this.getMyInformation();
  }

  
}
