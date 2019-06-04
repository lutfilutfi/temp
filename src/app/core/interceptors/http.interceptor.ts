import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Constants } from '../../app.config';
import { catchError, tap } from 'rxjs/operators';
import { PreloaderService } from '../../shared/preloader/preloader.service';
import * as _ from 'lodash';
import { NotifyService } from '../services/notify.service';
import { AuthService } from '../services/auth-service.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(
        private appConstants: Constants,
        private preloader: PreloaderService,
        private notify: NotifyService,
        private authService: AuthService
    ) {}

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const config = JSON.parse(
            req.params.get('_config') ? req.params.get('_config') : '{}'
        );
        return next
            .handle(this.setRequestHeaders(req, config)).pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        if (config['noLoader'] === 'false') {
                            this.preloader.stop();
                        }
                        if (event.type !== 0) {
                            return event;
                        } else {
                            return event;
                        }
                    }
                }, error => {
                    if (config['noLoader'] === 'false') {
                        this.preloader.stop();
                    }
                    // http response status code
                    if (error instanceof HttpErrorResponse) {
                        this.onSubscribeError(error, config);
                    }
                    return observableThrowError(error);
                })
            );
    }

    setRequestHeaders(req: HttpRequest<any>, config: any) {
        if (config['type'] == 'json') {
            return req;
        }
        if (config['noLoader'] === 'false') {
            this.preloader.start();
        }
        req = req.clone({ url: this.getFullUrl( req.url) });
        req = req.clone({ params: req.params.delete('_config') });
        const contentType = config['contentType'] ? config['contentType'] : 'application/json';
        const cultureCode = this.appConstants.defaultLanguageId.toString();
        const token = '' + this.authService.sessionToken;
        req = req.clone({ headers: req.headers.set('Authorization', token) });

        if (!(config['contentType'] === 'multipart/formdata')) {
            req = req.clone({ headers: req.headers.set('Content-Type', contentType) });
        }
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        req = req.clone({ headers: req.headers.set('language', cultureCode) });
        return req;
    }

    private onSubscribeError(error: any, config: any): void {
        if (error.status === 0 && !error.ok) {
            if (!navigator.onLine) {
                this.notify.show(3, ['Check your internet connection']);
            }
            else {
                this.notify.show(3, this.appConstants.commonAPIErrorMessage);
            }
        }
        else if (error.status === 401 ) {
            this.authService.sessionExpired();
        }
        else {
            if (error.error && error.error.message) {
                this.notify.show(3, error.error.message);
            }
            else {
                this.notify.show(3, this.appConstants.commonAPIErrorMessage);
            }
        }
    }

    private removeSlashes = (url: string): string => {
        // tslint:disable-next-line:curly
        if (!url) return url;
        if  (url.startsWith('/')) {
            url = url.slice(1, url.length);
        }
        if (url.endsWith('/')) {
            url = url.slice(0, url.length - 1);
        }
        return url;
    }

    /**
     * Build API url.
     * @param url
     * @returns {string}
     */

    private getFullUrl(url: string): string {
        // return full URL to API here
        const qUrl = url;
        const apiBasePath = this.appConstants.APIBasePath;
        return `${this.removeSlashes(apiBasePath)}/${this.removeSlashes(qUrl)}`;
    }
}
