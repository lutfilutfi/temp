import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


/**
 * Service to start/stop preloader and set preloader messages
 *
 * @export
 * @class Preloader
 */
@Injectable()
export class PreloaderService {
    public status: Subject<Object> = new Subject();
    private _active = false;
    private defaultMessage = 'MESSAGE.LOADING';
    public message: string;
    private counter = 0;

    /**
     * Creates an instance of Preloader.
     *
     *
     * @memberOf Preloader
     */
    constructor() {
        this.message = this.defaultMessage;
    }

    /**
     * Method to get status of the preloader
     *
     * @type {boolean}
     * @memberOf Preloader
     */
    public get active(): boolean {
        return this._active;
    }

    /**
     * Method to set the preloader status to true/false
     *
     *
     * @memberOf Preloader
     */
    public set active(v: boolean) {
        this._active = v;
        this.status.next(v);
    }

    /**
     * Method to start preloader by setting status to true
     *
     * @param {string} [m]
     *
     * @memberOf Preloader
     */
    public start(m?: string) {
        this.counter++;
        document.body.classList.add('cgc-c-api-preloader--shown');
        this.message = m
            ? m
            : this.message
                ? this.message
                : this.defaultMessage;
        this.active = true;
    }

    /**
     * Method to stop preloader by setting status to false
     *
     *
     * @memberOf Preloader
     */
    public stop(): void {
        this.counter--;
        if (this.counter <= 0) {
            document.body.className = document.body.className.replace('cgc-c-api-preloader--shown', '');
            this.resetMessage();
            this.active = false;
            this.counter = 0;
        }
    }

    /**
     * Method to set message of the preloader, if message is not passed with start method
     *
     * @param {any} message
     *
     * @memberOf Preloader
     */
    public setMessage(message): void {
        this.message = message;
    }

    /**
     * Method to reset the message
     *
     *
     * @memberOf Preloader
     */
    public resetMessage(): void {
        this.message = null;
    }
}
