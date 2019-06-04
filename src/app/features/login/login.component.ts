import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { LocalStoreService } from 'src/app/shared/local-store.service';
import { LoginService } from 'src/app/core/services/login.service';
import { AuthService } from 'src/app/core/services/auth-service.service';
import { StartupService } from 'src/app/core/services/startup.service';

@Component({
    selector: 'crc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    @ViewChild('password') passwordElement: ElementRef;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private authService: AuthService,
        private startupService: StartupService
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    /**
     * This method should be invocked durin the initialization of the login component.
     */
    buildForm() {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.email,this.emailValidator])],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
        });
    }

    /**
     * This method should be invocked when user clicks the login button.
     * On success of the login the onLoginCompleted() should be subscribed.
     */
    doLogin() {
        if (this.loginForm.valid) {
            this.authService.sessionToken = "token";
            this.startupService.initApplication();
            // this.loginService.login(this.loginForm.value)
            //     .subscribe(result => {
            //         if (result) {
            //             console.log('initial login completed');
            //             this.authService.sessionToken = result.data.token;
            //             this.startupService.initApplication();
            //         } else {
            //             console.log(
            //                 'Login error; redirecting to unauthorized access page'
            //             );
            //             this.router.navigate(['/login']);
            //         }
            //     });
        } else {
            _.forEach(this.loginForm.controls, (control) => {
                control.markAsTouched();
            });
        }
    }

    /* Toggle password */
    togglePassword() {
        if (this.passwordElement.nativeElement.type == "password") {
            this.passwordElement.nativeElement.type = 'text';
        }
        else if (this.passwordElement.nativeElement.type == 'text') {
            this.passwordElement.nativeElement.type = 'password';
        }
    }

    /* Email validator */
    emailValidator(control) {
        // RFC 2822 compliant regex
        if (typeof control.value === "string") {
            control.value = control.value.trim();
        }
        if (control.value === "" || control.value == null) {
            return null;
        } else if (
            control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/)) {
            return null;
        } else {
            return { invalidEmail: true };
        }
    }
}
