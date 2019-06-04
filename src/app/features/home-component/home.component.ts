import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from 'src/app/app.config';
import { CommonService } from 'src/app/core/services/common.service';
import { LocalStoreService } from 'src/app/shared/local-store.service';
import { NotifyService } from 'src/app/core/services/notify.service';
@Component({
    selector: 'experion-rms-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private guidelinesData: any[] = [];

    constructor(
        public appConstants: Constants,
        public commonService: CommonService,
        public localStore: LocalStoreService,
        public notify: NotifyService,
        private http: HttpClient
    ) {
       
    }

    ngOnInit() { }

   

}
