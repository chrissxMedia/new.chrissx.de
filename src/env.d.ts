/// <reference types="astro/client" />

declare type _ytrack = {
    name: string,
    isrc?: string,
    length: number,
    lyrics?: string,
    artists?: [string, ...string[]],
};

declare type _yalbum = {
    name: string,
    upc?: number,
    artists: [string, ...string[]],
    release: string,
    cover?: string,
    link?: string,
    tracks: [_ytrack, ..._ytrack[]],
};

declare type track = _ytrack & Required<Pick<_ytrack, "artists">>;
declare type album = Omit<Omit<_yalbum, "tracks">, "release">
    & { tracks: [track, ...track[]], release: import("dayjs").Dayjs };

declare module "*/albums.yaml" {
    const value: _yalbum[];
    export default value;
}
