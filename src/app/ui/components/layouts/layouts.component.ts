import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginResponseModel } from '../auth/models/login-response.model';
import { CryptoService } from 'src/app/common/directives/services/crypto.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  // RouterModule i biz ekledik.Başka sayfaya yönlendirme yapabilmek için
  imports: [CommonModule,RouterModule,NavbarComponent,AsideComponent,FooterComponent,ControlSidebarComponent],
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent {

  loginResponse:LoginResponseModel=new LoginResponseModel();

  constructor(
    private _crypto:CryptoService
  ) {

    let loginResponseString=_crypto.decrypto(localStorage.getItem("accessToken").toString());

    this.loginResponse=JSON.parse(loginResponseString);
  }

}
