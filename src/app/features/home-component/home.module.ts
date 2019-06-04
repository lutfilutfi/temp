import { NgModule } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
    ],
    entryComponents: []
})
export class HomeModule { }
