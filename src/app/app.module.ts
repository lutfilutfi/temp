import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from './app.routing';
import { CoreModule } from 'src/app/core/core.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './features/header-component/header-component.component';
import { HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import { CustomHttpInterceptor } from './core/interceptors/http.interceptor';
import { MainComponent } from './features/main/main.component';
import { CreateJobComponent } from './features/create-job/create-job.component';
import {HttpModule} from '@angular/http';
import { ServerServices } from './core/services/server.services';
import { LeaderBoardFilterPipe } from './core/pipes/leader-board-filter.pipe';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponentComponent,
        MainComponent,
        // GetFormComponent,
        LeaderBoardFilterPipe,
        CreateJobComponent
    ],
    imports: [
        HttpModule,
        BrowserModule,
        Routing,
        CoreModule,
        PerfectScrollbarModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    exports: [BsDropdownModule],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi: true
        },
        ServerServices
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule { }
