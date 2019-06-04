import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin as observableForkJoin, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';

import { LocalStoreService } from '../../shared/local-store.service';
import { ApplicationSettingsService } from '../../core/services/application-settings.service';
import { Constants } from '../../app.config';

@Injectable({
    providedIn: 'root'
})
export class StartupService {
    public selectedLanguageId: any;
    public flowDirection: any;
    masterdata: any;
    userInfo: any;
    private initApplicationSubject = new Subject<any>();
    applicationInitiated$ = this.initApplicationSubject.asObservable();
    constructor(
        private httpClient: HttpClient,
        private localStore: LocalStoreService,
        private applicationSettingsService: ApplicationSettingsService,
        private appConstants: Constants
    ) {}

    initApplication() {
        this.initApplicationSubject.next(true);
    }
    setApplicationLanguage(id) {
        // if passed id is null, set default language id
        if (_.isNull(id) || id === 0) {
            id = this.appConstants.defaultLanguageId;
        }
        this.selectedLanguageId = id;
        this.flowDirection = this.appConstants.defaultFlowDirection
            ? this.appConstants.defaultFlowDirection
            : 'rtl';
        document.dir = this.flowDirection;
    }
}
