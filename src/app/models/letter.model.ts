export interface Letter {
    tldid: string;
    debug?: boolean;
    location: string;
    order: number[];
    times: number[];
    down?: number[];
    duration?: number[];
    text?: string;
}

export interface EncryptedLetter {
    tldid: string;
    debug?: boolean;
    password: string;
    encrypted_letter: string;
}

export interface PasswordRequired {
    passwordRequired: true;
}

export function passwordRequired(obj: Letter | PasswordRequired): obj is PasswordRequired {
    return obj && 'passwordRequired' in obj && !obj['passwordRequired'];
}
