import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StartupService } from '../core/services/startup.service';
import { NotifyService } from '../core/services/notify.service';
import { TrimValueAccessorDirective } from '../core/directives/trim-value-accessor';
import { AllowSpecialCharactersDirective } from '../core/directives/no-special-characters';


// App settings initiliazer method
export function get_settings(startupService: StartupService) {
    return () => startupService.initApplication();
}

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TrimValueAccessorDirective,
        AllowSpecialCharactersDirective
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        TrimValueAccessorDirective,
        AllowSpecialCharactersDirective
    ],
    providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                NotifyService,
                // { provide: APP_INITIALIZER, useFactory: get_settings, deps: [StartupService], multi: true }
            ]
        };
    }
}
