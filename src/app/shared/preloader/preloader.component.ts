import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PreloaderService } from './preloader.service';

@Component({
  selector: 'crc-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

    public active: boolean;
    public message: any;
    public constructor(private preloader: PreloaderService,
        private changeDetectorRef: ChangeDetectorRef) {
        preloader.status.subscribe((status: boolean) => {
            this.message = this.preloader.message ? this.preloader.message : null;
            this.active = status;
            this.changeDetectorRef.detectChanges();
        });
    }

  ngOnInit() {
  }

}
