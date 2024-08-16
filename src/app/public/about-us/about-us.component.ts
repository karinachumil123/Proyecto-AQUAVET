import { Component } from '@angular/core';
import { NavbarTopComponent } from '../../shared/components/public/navbar-top/navbar-top.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NavbarTopComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
