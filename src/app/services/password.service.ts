import { Injectable } from '@angular/core';

import * as crypto from 'crypto-js';

@Injectable()
export class PasswordService {

    hash (password: string, tldid: string): string {
        return crypto.enc.Base64.stringify(crypto.SHA512(password + tldid));
    }

    verify (hashedPassword: string, attempt: string, tldid: string) {
        return hashedPassword === this.hash(attempt, tldid);
    }
};