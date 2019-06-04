import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import { Router, NavigationStart } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../app.config';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {
    private toastOptions: any;
    constructor(
        private toastyService: ToastrService,
        private appConstants: Constants,
        private router: Router,
        private injector: Injector
    ) {
        this.toastOptions = {
            closeButton: true,
            timeOut: this.appConstants.notificationTimeout,
            positionClass: 'toast-top-right',
            enableHtml: true,
            tapToDismiss: false
        };
        /*** Uncomment if notify not needed in redirection
		router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                this.toastyService.clearAll();
            }
        });**/
    }

    // public get language(): LanguageService {
    //     return this.injector.get(LanguageService);
    // }

    _show(status: number, messages: any) {
        let type,
            msg = '';
        switch (status) {
            case 0:
                type = 'success';
                break;
            case 1:
                type = 'warning';
                break;
            case 3:
                type = 'error';
                break;
            default:
                type = 'default';
        }
        if (_.isArray(messages)) {
            _.forEach(messages, (message, key) => {
                msg += message['messageText'] + '<br>';
            });
        } else {
            msg = messages;
        }

        if (msg !== '') {
            this.toastOptions.msg = msg;
            this.toastOptions.title = _.upperFirst(type);
            this.toastyService[type](this.toastOptions);
        }
    }

    show(status: number, messages: any) {
        let type,
            msg = '';
        switch (status) {
            case 0:
                type = 'success';
                break;
            case 1:
                type = 'warning';
                break;
            case 3:
                type = 'error';
                break;
            default:
                type = 'default';
        }
        if (_.isArray(messages)) {
            _.forEach(messages, (message, key) => {
                msg += message['messageText'] + '<br>';
            });
        } else {
            msg = messages;
        }

        if (msg !== '') {
            const message = msg;
            const title = _.upperFirst(type);
            this.toastyService[type](message, title, this.toastOptions);
        }
    }
}
