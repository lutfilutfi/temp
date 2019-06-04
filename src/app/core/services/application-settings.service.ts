import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApplicationSettingsService {
  public recentApplicationSettingsId = 0;
  public sortDescriptions;
  public stepperPageSize = 0;

  constructor(
    private httpClient: HttpClient
  ) {
  }
   /**
   * To get display order
   */
  public getAllApplicationSettings(): Observable<any> {
    return this.httpClient.get('api/applicationsettings', {
        params: {
          _config:
          '{ "type": "COMMON", "noLoader": "false", "noNotify": "false", "noNotifyError": "false" }'
        }
    });
}

}
