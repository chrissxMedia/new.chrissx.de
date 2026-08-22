export type Format = "genius" | "musixmatch" | "plain";

export const FORMATS: [Format, ...Format[]] = ["genius", "musixmatch", "plain"];

export const DEFAULT_FORMAT: Format = "genius";

export const FORMAT_EVENT = "lyrics-format-change";

export const STORAGE_KEY = "lyrics-format";
