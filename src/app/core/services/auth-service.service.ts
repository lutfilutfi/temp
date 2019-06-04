import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Constants } from 'src/app/app.config';
import { LocalStoreService } from 'src/app/shared/local-store.service';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * Authentication Service
 *
 * @export
 * @class AuthService
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public onLoginCompleted: Subject<Object> = new Subject();
    public onLogout: Subject<Object> = new Subject();
    public sessionToken: any;
    public loginCompleted: boolean = false;
    public receivingToken: boolean;
    public jwtHelper: any;
    // public router: Router;

    /**
     * Creates an instance of AuthService.
     *
     * @param {LocalStorage} localStore
     * @param {Constants} appConstants
     *
     * @memberOf AuthService
     */
    constructor(
        private localStore: LocalStoreService,
        private appConstants: Constants,
        private injector: Injector,
        private loginService: LoginService,
        private router: Router
    ) {
        this.jwtHelper = new JwtHelperService();
    }

    // public get loginService(): LoginService {
    // 	return this.injector.get(LoginService);
    // }

    /**
     * Method to check if the user is loggedIn
     *
     * @returns {any}
     *
     * @memberOf AuthService
     */
    isLoggedIn(): any {
        return true;
        const existingToken = this.localStore.get('userInfo');
        // existing token and local token should not be null
        if (!_.isNull(existingToken) && !_.isNull(existingToken.accessToken)) {
            // existing token and local token should be equal
            // return existingToken.accessToken;
            const isExpired = this.jwtHelper.isTokenExpired(existingToken);
            if (!isExpired) {
                this.sessionToken = existingToken;
                return true
            }
            else {
                this.clearSessionToken();
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Method to handle session expiry
     *
     * @returns {any}
     *
     * @memberOf AuthService
     */
    sessionExpired(): Promise<boolean> {
        const existingToken = this.localStore.get('userInfo');
        return new Promise(resolve => {
            if (!existingToken) {
                this.clearSession();
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }

    clearSession() {
        // console.log('clearing session');
        this.clearSessionToken();
    }

    clearSessionToken() {
        this.localStore.clear();
        this.sessionToken = null;
        this.loginCompleted = false;
    }

    logout(): Observable<any> {
        return this.loginService.logout().pipe(
            map(result => {
                return result;
            })
        );
    }
}
