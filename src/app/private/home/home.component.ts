import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../shared/components/private/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/private/navbar/navbar.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent ,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{

  authService = inject(AuthService)
  router = inject(Router);

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
    }
  }


}
