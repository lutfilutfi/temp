import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getSamples() {
    return this.httpClient.get('sample-api', {
      params: {
        _config:
          '{ "type": "COMMON", "noLoader": "false", "noNotify": "false", "noNotifyError": "false" }'
      }
    });
  }

 
}
