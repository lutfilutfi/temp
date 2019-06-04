import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';
import { PreloaderComponent } from '../shared/preloader/preloader.component';
import { HttpClientModule } from '@angular/common/http';

import { UnauthorizedAccessComponent } from './unauthorized-access/unauthorized-access.component';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { Constants } from './../app.config';
import { PreloaderService } from '../shared/preloader/preloader.service';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        HttpClientModule,
        // SharedModule,
    ],
    exports: [
        PreloaderComponent
    ],
    declarations: [
        UnauthorizedAccessComponent,
        PreloaderComponent
    ],
    providers: [
        AuthGuard,
        Constants,
        PreloaderService,
        DatePipe
    ]
})
export class CoreModule { }
