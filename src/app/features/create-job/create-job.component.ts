import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerServices } from '../../core/services/server.services';
import { vacancy } from '../../shared/vacancy.model';

@Component({
  selector: 'experion-rms-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  fal: number;
  desci: String;
  vac: vacancy;
  // buuu:any;

  constructor(private serverService: ServerServices) {
    this.fal = 0;
    this.desci = "Trial";
    // this.vac.buissnessUnit=['BSS','PES','DTS'],
    // console.log(this.vac.buissnessUnit)
    this.serverService.getDefaults()
    .subscribe(
      (response: any) => {
        var t = JSON.parse(response._body);
        this.vac=new vacancy(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9]);
        // console.log(this.vac);
    },
    (error:any) => { console.log("Error", error) }
    )
    // this.buuu = this.vac.buissnessUnit;  
    }

    ngOnInit() {}

    onSubmit(form: NgForm){
      console.log('hey onSubmit')
      this.serverService.saveJobs(form)
        .subscribe(
          (response: any) => { console.log(response.body) },
          (error: any) => { console.log(error) }
        );
    }

    onClick(r: ElementRef){
      this.fal = 1;
      // return this.vac.jobDescription[]
    }

  }
