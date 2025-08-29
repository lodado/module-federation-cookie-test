
    export type RemoteKeys = 'remote2/CookieValue';
    type PackageType<T> = T extends 'remote2/CookieValue' ? typeof import('remote2/CookieValue') :any;