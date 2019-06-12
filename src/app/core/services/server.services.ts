import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

constructor ( private http: Http ) {}

baseUrl = "http://localhost:3000";

// saveJobs(data: NgForm){
//     return this.http.post(this.baseUrl +'/addvacancy',data);
// }
// getJobs(){}

saveJobs(form : NgForm){
    console.log("saveJobs");

    // console.log(form.value);
    return this.http.post(this.baseUrl +'/addvacancy', form);
}

getDefaults(){
    console.log("getDefaults");
    return this.http.get(this.baseUrl);
}

}