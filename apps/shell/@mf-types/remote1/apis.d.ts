
    export type RemoteKeys = 'remote1/CookieValue';
    type PackageType<T> = T extends 'remote1/CookieValue' ? typeof import('remote1/CookieValue') :any;