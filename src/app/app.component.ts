import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {
    Router,
    RouteConfigLoadStart,
    RouteConfigLoadEnd
} from '@angular/router';
import { PreloaderService } from './shared/preloader/preloader.service';
import { Constants } from 'src/app/app.config';
import { AuthService } from 'src/app/core/services/auth-service.service';
import { StartupService } from 'src/app/core/services/startup.service';

@Component({
    selector: 'crc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        private preloader: PreloaderService,
        private appConstants: Constants,
        public authService: AuthService,
        private startupService: StartupService
    ) {}

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart) {
                this.preloader.start();
            } else if (event instanceof RouteConfigLoadEnd) {
                this.preloader.stop();
            }
        });
        this.startupService.setApplicationLanguage(
            this.appConstants.defaultLanguageId
        );
        this.startupService.applicationInitiated$.subscribe((userInfo: any) => {
            this.authService.loginCompleted = true;
            console.log('hereeeeeeeeee');
            this.router.navigate(['/home']);
        });
    }
}
