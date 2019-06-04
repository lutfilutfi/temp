import { Constants } from './../app.config';
import * as CryptoJS from 'crypto-js';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

    key: string;
    iv: string;


    /**
     * Generates encrypted text from raw text
     *
     * @param {string} rawData
     * @returns {string}
     *
     * @memberOf CryptoService
     */
    encrypt(rawData) {
        const encrypted = CryptoJS.AES.encrypt(rawData, this.key, {iv: this.iv});
        return encrypted.toString();
    }

    /**
     * Decrypts the encrypted string provided
     *
     * @param {string} encryptedData
     * @returns {string}
     *
     * @memberOf CryptoService
     */
    decrypt(encryptedData) {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, this.key, {iv: this.iv});
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    md5(key) {
        const hash = CryptoJS.MD5(key);
        return hash.toString();
    }

    /**
     * Creates an instance of CryptoService.
     *
     * @param {Constants} AppConstants
     *
     * @memberOf CryptoService
     */
    constructor(private AppConstants: Constants) {
        this.key = AppConstants.EncryptKey;
        this.iv = AppConstants.IV;
    }
}
