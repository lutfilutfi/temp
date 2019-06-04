import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class Constants {
    EncryptKey: string;
    APIBasePath: string;
    pageStepper: any[];
    gridPageSizeInPopup: number;
    dateFormat: any = 'dd MMM yyyy';
    dateTimeFormat: any;
    commonAPIErrorMessage: string;
    notificationTimeout: number;
    GridPageSize: number;
    TooltipMaxLength: number;
    dateConversionFormatForDatePicker: string;
    gidColumnHeaderHeight: number;
    columnHeaderRowDefaultsize: number;
    allowedImageExtension: any;
    toolTipLength: number;
    languages: any[];
    IV: string;
    defaultLanguageId: number;
    defaultCultureCode: string;
    defaultFlowDirection: string;
    gridRowsDefaultsize: number;
    timePickerFormat: any;
    timePickerFormat_tt: any;
    gidColumnHeaderHeightForMultiLine: any;
    momentTimeFormat12H: any;
    momentTimeFormat24H: any;
    columnHeaderRowDoubleSize: any;

    constructor() {
        this.APIBasePath = environment.APIBasePath;
        this.commonAPIErrorMessage = 'Server Error';
        this.notificationTimeout = 5000;
        this.timePickerFormat = 'hh:mm tt';
        this.timePickerFormat_tt = 'HH:mm';
        this.EncryptKey = ''; // TODO
        this.GridPageSize = 10;
        this.gridPageSizeInPopup = 5;
        this.TooltipMaxLength = 10;
        this.dateConversionFormatForDatePicker = 'YYYY-MM-DD HH:mm:ss';
        this.gidColumnHeaderHeight = 50;
        this.defaultLanguageId = 1;
        this.columnHeaderRowDefaultsize = 37;
        this.columnHeaderRowDoubleSize = 57;
        this.IV = ''; // TODO
        this.defaultCultureCode = 'en';
        this.defaultFlowDirection = 'ltr';
        this.pageStepper = [
            { id: 5, name: '5' },
            { id: 10, name: '10' },
            { id: 15, name: '15' },
            { id: 25, name: '25' },
            { id: 50, name: '50' },
            { id: 100, name: '100' }
        ];
        this.gridRowsDefaultsize = 29;
        this.defaultCultureCode = 'en';
        this.defaultFlowDirection = 'ltr';
        this.gidColumnHeaderHeightForMultiLine = 57;
        this.momentTimeFormat12H = 'hh:mm a';
        this.momentTimeFormat24H = 'HH:mm';
        this.languages = [
            {
                cultureCode: 'en-US',
                id: 1,
                isActive: true,
                languageName: 'English'
            },
            {
                cultureCode: 'ar-sa',
                id: 2,
                isActive: true,
                languageName: 'Arabic'
            }
        ];
    }
}
