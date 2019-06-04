import { Constants } from './../../app.config';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    public windowResized: Subject<Object> = new Subject();
    pageHeader: string;

    constructor(private appConstants: Constants, private datePipe: DatePipe) {}

    /**
     * Method to convert unix date to local date.
     * @param epoch
     */
    convertUnixToLocalDate(epoch: number) {
        return moment(
            moment
                .unix(epoch)
                .utc()
                .format(this.appConstants.dateConversionFormatForDatePicker)
        ).toDate();
    }

    /**
     * Method to convert the local date to unix.
     * @param date
     */
    convertLocalDateToUnix(date: any) {
        return moment
            .utc(
                moment(date).format(
                    this.appConstants.dateConversionFormatForDatePicker
                )
            )
            .unix();
    }

    /**
     * Method to convert unix date to local time.
     * @param epoch
     */
    convertUnixToLocalTime(epoch: number) {
        return moment(
            moment
                .unix(epoch)
                .utc()
                .format(this.appConstants.dateConversionFormatForDatePicker)
        ).toDate();
    }

    /** Method to get moment date without time
     *
     * @param {any} dateObj
     * @returns
     * @memberof CommonService
     */
    public getDateFromDateTime(dateObj) {
        if (!(dateObj instanceof moment)) {
            dateObj = moment(dateObj);
        }
        return moment(dateObj.format('YYYY-MM-DD'));
    }

    /**
     * method to get dateTime OBJ from time (10:00 AM)
     * @param
     */
    convertTimeToLocalDate(time: string) {
        if (time) {
            return moment(time, 'hh:mm a Z').toDate();
        } else {
            return '';
        }
    }
}
