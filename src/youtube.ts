import { Innertube } from "youtubei.js";

export async function youtubeAvatars(ids: string[]) {
    const youtube = await Innertube.create({
        retrieve_player: false,
        fail_fast: true,
        fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(5000) }),
    }).catch((error) => {
        console.warn("Could not connect to YouTube:", error.message);
        return null;
    });

    return Promise.all(ids.map(async (id) => {
        try {
            const channel = await youtube?.getChannel(id);
            return channel?.metadata.avatar?.[0]?.url;
        } catch (error) {
            console.warn(`Could not load the YouTube avatar for ${id}:`, error);
        }
    }));
}
