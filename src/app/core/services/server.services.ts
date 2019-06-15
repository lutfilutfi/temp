import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CustomHttpInterceptor } from '../interceptors/http.interceptor';
import { vacancy } from 'src/app/shared/vacancy.model';

// Access-Control-Allow-origin: *;
// Vary : origin

// export class default {
//     buissnessUnit:String;
//     jobRole: String ;
//     primarySkills :String;
//     Experience: String;
//     location: String;
//     endDate: String;
//     vacancies: String;
//     buHead: String;
//     hiringManager: String;
//     band: String;

// }

@Injectable()
export class ServerServices {

    constructor(private http: HttpClient, private provided: CustomHttpInterceptor) { }


    saveJobs(form : vacancy) {
        console.log("saveJobs");

        console.log(form);
        return this.http.post("addVacancy", form);
    }

    getDefaults() {
        console.log("getDefaults");
        return this.http.get("");
    }

}