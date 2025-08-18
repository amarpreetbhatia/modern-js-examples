
    export type RemoteKeys = 'remote/Button' | 'remote/Button.data';
    type PackageType<T> = T extends 'remote/Button.data' ? typeof import('remote/Button.data') :T extends 'remote/Button' ? typeof import('remote/Button') :any;