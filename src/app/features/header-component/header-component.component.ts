import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/home.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service.service';
@Component({
  selector: 'crk-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {
  employeeDetails: any;

  constructor(
    private homeService: HomeService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    // this.homeService.getSamples().subscribe(resp => {
    //   this.employeeDetails = resp;
    // });
  }

  /* Logout */
  doLogout() {
    this.authService.clearSessionToken();
    this.router.navigate(['/login']);
  }

}
