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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './core/interceptors/http.interceptor';
import { MainComponent } from './main/main.component';
import { GetFormComponent } from './main/get-form/get-form.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponentComponent,
        MainComponent,
        GetFormComponent,
    ],
    imports: [
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
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule { }
