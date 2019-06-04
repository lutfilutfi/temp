import { LocalStoreService } from './../../shared/local-store.service';
import { AuthService } from '../services/auth-service.service';
import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { CanActivate } from '@angular/router';
import * as _ from 'lodash';
import { Constants } from '../../app.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        snapshot: RouterStateSnapshot
    ): Promise<boolean> | boolean {
        if (this.authService.isLoggedIn() !== false) {
            // If logged in, move to home, if route is login
            if (snapshot.url == '/login') {
                this.router.navigate(['/home']);
            }
            this.authService.loginCompleted = true;
            return true;
        } 
        else {
            // If not logged in, allow, if route is login
            if (snapshot.url == '/login') {
                return true;
            }
            else if (snapshot.url == '/home') {
                this.router.navigate(['/login']);
            }
            return false
        }
    }
}
