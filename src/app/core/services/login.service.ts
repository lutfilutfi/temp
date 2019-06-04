import { of as observableOf, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LocalStoreService } from 'src/app/shared/local-store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private localStore: LocalStoreService,
        private httpClient: HttpClient
    ) {}

    /**
     * Method to login to the system
     *
     * @param {any} userCredentials
     * @returns
     * @memberof LoginService
     */
    login(userCredentials) {
        // let url = "login";
        const url = 'validateUser';
        const _headers = {
            language: '1',
        };
        if (!userCredentials) {
            userCredentials = {};
        }
        const headers = new HttpHeaders(_headers);
        return this.httpClient
            .post(url, userCredentials, {
                headers: headers,
                params: {
                    _config:
                        '{ "type": "COMMON", "noLoader": "false", "noNotify": "false", "noNotifyError": "false", "isLogin": "true" }'
                }
            })
            .pipe(
                map((response: any) => {
                    if (response && response.data.token != null) {
                        const updatedToken = response.data.token;
                        this.localStore.store('userInfo', updatedToken);
                        return response;
                    } else {
                        return false;
                    }
                })
            );
    }

    /**
     * @returns {Observable<any>}
     * @memberOf LoginService
     */
    isSessionExpired(oldToken): Observable<any> {
        const headers = new HttpHeaders({ 'x-bif-private-token': oldToken });
        return this.httpClient
            .get('users/sessionexpired', {
                headers: headers,
                params: {
                    _config:
                        '{ "type": "COMMON", "noLoader": "false", "noNotify": "false", "noNotifyError": "false" }'
                }
            })
            .pipe(
                map((response: any) => {
                    return response.data;
                }),
                catchError((err, caught) => {
                    return observableOf(false);
                })
            );
    }

    /**
     * Method to logout
     * @memberOf LoginService
     */
    logout(): Observable<any> {
        return this.httpClient
            .put('api/account/logout', undefined, {
                params: {
                    _config:
                        '{ "type": "COMMON", "noLoader": "false", "noNotify": "false", "noNotifyError": "false" }'
                }
            })
            .pipe(
                map((response: any) => {
                    return response.data;
                }),
                catchError((err, caught) => {
                    return observableOf(false);
                })
            );
    }

    getAllLanguages(): Observable<any> {
        return this.httpClient.get('languages', {
            params: {
                _config:
                    '{ "type": "COMMON", "noLoader": "true", "noNotify": "false", "noNotifyError": "false" }'
            }
        });
    }
}
