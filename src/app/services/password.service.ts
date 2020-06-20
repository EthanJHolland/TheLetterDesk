import { Injectable } from '@angular/core';
import { Letter, EncryptedLetter } from '../models/letter.model';

import * as crypto from 'crypto-js';

@Injectable()
export class PasswordService {
    encrypt (letter: Letter, password: string): EncryptedLetter {
        return {
            tldid: letter.tldid,
            debug: letter.debug,
            password: this.hash(password, letter.tldid),
            encrypted_letter: JSON.stringify(letter)
        }
    }

    hash (password: string, tldid: string): string {
        return crypto.enc.Base64.stringify(crypto.SHA512(password + tldid));
    }
};