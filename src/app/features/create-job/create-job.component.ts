import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  ck:boolean;
  vac: vacancy;
  buuu:vacancy;
  prSkills : any[];
  @ViewChild('frm') form:NgForm;
  @ViewChild('in') in:ElementRef;
  @ViewChild('role') role:ElementRef;
  @ViewChild('bu') bu:ElementRef;
  @ViewChild('ps') ps:ElementRef;
  @ViewChild('exp') exp:ElementRef;
  @ViewChild('loc') loc:ElementRef;
  @ViewChild('ed') ed:ElementRef;
  @ViewChild('vc') vc:ElementRef;
  @ViewChild('bh') bh:ElementRef;
  @ViewChild('hm') hm:ElementRef;
  @ViewChild('bn') bn:ElementRef;
  @ViewChild('jd') jd:ElementRef;
  @ViewChild('rc') rc:ElementRef;

  constructor(private serverService: ServerServices) {
    this.fal = 0;
    this.desci = "Trial";
    this.ck = true;
    // this.vac.buissnessUnit=['BSS','PES','DTS'],
    // console.log(this.vac.buissnessUnit)
    this.serverService.getDefaults()
    .subscribe(
      (response: any) => {
        var t = response;
        this.vac=new vacancy(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9]);
        // console.log(this.vac);
    },
    (error:any) => { console.log("Error", error) }
    )
    // this.buuu = this.vac.buissnessUnit;  
    }

    ngOnInit() {}

    onSubmit(){
      // this.p=this.ps.nativeElement.value,
      console.log(JSON.stringify(this.ps));
      this.buuu=new vacancy(
        this.bu.nativeElement.value,
        this.ps.nativeElement.value,
        // this.p,
        this.exp.nativeElement.value,
        this.vc.nativeElement.value,
        this.bh.nativeElement.value,
        this.hm.nativeElement.value,
        this.bn.nativeElement.value,
        this.jd.nativeElement.value,
        this.loc.nativeElement.value,
        this.rc.nativeElement.value,
        // this.
      )
      // console.log(this.buuu.primarySkills);
      this.serverService.saveJobs(this.buuu)
        .subscribe(
          (response: any) => { console.log("response") },
          (error: any) => { console.log(error) }
        );
        // this.form.resetForm();
    }

    onReset(){
      this.form.resetForm();
      this.ck=true;
    }

    validateForm(){
      if (this.form.valid ) {
        return this.ck= false;
      }
    }

    onClick(r: ElementRef){
      this.fal = 1;
      // return this.vac.jobDescription[]
    }

    addSkill(){
      this.prSkills.push(this.in);
      console.log(this.prSkills);
    }

  }
