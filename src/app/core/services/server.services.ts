import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { NgForm } from '@angular/forms';

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

getJobs(){}

saveJobs(form : NgForm){
    console.log("saveJobs");
    return this.http.put('http://localhost:3000', form);
}

getDefaults(){
    console.log("getDefaults");
    return this.http.get('http://localhost:3000');
}

}