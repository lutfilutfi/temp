import { Injectable, Inject } from '@angular/core';
import { CryptoService } from './crypto.service';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class LocalStoreService {
    private cryptoService: CryptoService;

    /**
     * Store data to local storage after encryption
     *
     * @param {string} key
     * @param {string} data
     *
     * @memberOf LocalStorage
     */
    store(key, data) {
        const encryptedData = this.cryptoService
            .encrypt(JSON.stringify(data))
            .toString();
        const keyHashed = this.getOriginalHashedKey(key);
        window.localStorage.setItem(keyHashed, encryptedData);
    }

    /**
     * Get data from local storage after decryption
     *
     * @param {string} key
     * @returns
     *
     * @memberOf LocalStorage
     */
    get(key) {
        const keyHashed = this.getOriginalHashedKey(key);
        const encryptedData = window.localStorage.getItem(keyHashed);
        if (!_.isNull(encryptedData)) {
            if (!_.isEmpty(this.cryptoService.decrypt(encryptedData))) {
                return JSON.parse(this.cryptoService.decrypt(encryptedData));
            }
        }

        return null;
    }

    /**
     * Method to clear all local storage items from browser (destructive!)
     *
     *
     * @memberOf LocalStorage
     */
    clear() {
        _.forIn(window.localStorage, (value: string, objKey: string) => {
            if (false === _.startsWith(objKey, 'PT_')) {
                window.localStorage.removeItem(objKey);
            }
        });
    }

    /**
     * Method to return correct hashed key
     *
     * @param {any} key
     * @returns
     * @memberof LocalStorage
     */
    getOriginalHashedKey(key) {
        let originalKey = key;
        let keyHashed;
        if (true === _.startsWith(key, 'PT_')) {
            originalKey = key.split('PT_').pop();
            keyHashed = this.cryptoService.md5(originalKey);
            keyHashed = 'PT_' + keyHashed;
        } else {
            keyHashed = this.cryptoService.md5(originalKey);
        }
        return keyHashed;
    }

    constructor(@Inject(CryptoService) cryptoService: CryptoService) {
        this.cryptoService = cryptoService;
    }
}
