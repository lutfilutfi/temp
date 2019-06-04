import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import * as _ from 'lodash';


import { LocalStoreService } from 'src/app/shared/local-store.service';
import { LoginService } from 'src/app/core/services/login.service';
import { AuthService } from 'src/app/core/services/auth-service.service';
import { StartupService } from 'src/app/core/services/startup.service';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [LoginComponent],
      providers: [
        LoginService,
        StartupService,
        AuthService,
        LocalStoreService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The username field should be null', () => {
    expect(component.loginForm.controls['userName'].value == "").toBeTruthy();

  })
});
