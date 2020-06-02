import { Injectable } from '@angular/core';
import { PrivateConstants } from '../constants.private';

import * as crypto from 'crypto';
 
@Injectable()
export class PasswordService {
    hasher = crypto.createHash(PrivateConstants.CRYPTOGRAPHIC_HASH_ALG);

    hash (password: string, tldid: string): string {
        const saltedPassword = password + tldid;
        return this.hasher.update(saltedPassword).digest('hex');
    }

    verify (hashedPassword: string, attempt: string, tldid: string) {
        return hashedPassword === this.hash(attempt, tldid);
    }
};