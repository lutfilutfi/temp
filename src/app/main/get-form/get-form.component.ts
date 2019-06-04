import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'experion-rms-get-form',
  templateUrl: './get-form.component.html',
  styleUrls: ['./get-form.component.scss']
})
export class GetFormComponent implements OnInit {
  @Input() gff:number;
  @Output()gffchange=new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  back()
  {
    console.log('back');
    this.gff=0;
    this.gffchange.emit();
  }

}
