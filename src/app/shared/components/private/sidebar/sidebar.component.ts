import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { BaseService } from '../../../../core/services/base-api.service';
import { IUserProfile } from '../../../../core/models/IUserProfile.interface';
import { Route, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  authService = inject(AuthService)
  baseService = inject(BaseService)
  userProfile:IUserProfile | undefined;
  
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


  irA(){

  }
}
