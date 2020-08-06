export interface DBError {
    error: string;
}

export function isDBError(obj): obj is DBError{
    return obj && 'error' in obj;
}