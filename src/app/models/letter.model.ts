export interface Letter {
    tldid: string;
    debug?: boolean;
    location: string;
    order: number[];
    times: number[];
    text?: string;
}

export interface PasswordRequired {
    passwordRequired: true;
}

export interface DoesNotExist {
    doesNotExist: true;
}

export type RetrieveResponse = Letter | PasswordRequired | DoesNotExist

export function passwordRequired(res: RetrieveResponse): res is PasswordRequired {
    return res && 'passwordRequired' in res && res['passwordRequired'];
}

export function doesNotExist(res: RetrieveResponse): res is DoesNotExist {
    return res && 'doesNotExist' in res && res['doesNotExist'];
}