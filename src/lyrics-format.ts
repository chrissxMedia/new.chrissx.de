import type { LyricStyle } from "g2mm";

export const FORMATS = ["genius", "musixmatch", "plain"] as const;

export const DEFAULT_FORMAT: LyricStyle = "genius";

export const FORMAT_EVENT = "lyrics-format-change";

export const STORAGE_KEY = "lyrics-format";
