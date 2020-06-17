export interface BasicLetter {
    tldid: string;
    location: string;
    order: number[];
    times: number[];
    down?: number[];
    duration?: number[];
    text?: string;
    debug?: boolean;
}

export interface EncryptedLetter {
    tldid: string;
    debug: boolean;
    password: string;
    encrypted_letter: string;
}

export type Letter = BasicLetter | EncryptedLetter;

export function isEncrypted(letter: Letter): letter is EncryptedLetter {
    return letter && 'password' in letter;
}
