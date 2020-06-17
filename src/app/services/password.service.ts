import { Injectable } from '@angular/core';
import { BasicLetter, EncryptedLetter } from '../models/letter.model';

import * as crypto from 'crypto-js';

@Injectable()
export class PasswordService {
    encrypt (letter: BasicLetter, password: string): EncryptedLetter {
        return {
            tldid: letter.tldid,
            debug: letter.debug,
            password: this.hash(password, letter.tldid),
            encrypted_letter: JSON.stringify(letter)
        }
    }

    decrypt (encryptedLetter: EncryptedLetter, password: string): BasicLetter {
        return JSON.parse(encryptedLetter.encrypted_letter);
    }

    hash (password: string, tldid: string): string {
        return crypto.enc.Base64.stringify(crypto.SHA512(password + tldid));
    }

    verify (attempt: string, encryptedLetter: EncryptedLetter): boolean {
        return encryptedLetter.password === this.hash(attempt, encryptedLetter.tldid);
    }
};