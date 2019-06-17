import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'experion-rms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  jl: {id:number,
        bu:string
        role:string,
        ps:string,
        exp:number,
        location:string,
        desc:string,
        status:string,
        referals:number,
        date:string
        }[]=[{"id":132,"bu":'ESS',"role":'Business Analyst',"ps":'Implementation',"exp":10,"location":'kochi',"desc":'BA',"status":'open',"referals":24,"date":'25/3/2019'}];
  gf=0;
  constructor() { }

  ngOnInit() {
  }
  sub()
  {
    this.gf=1;
  }


}
