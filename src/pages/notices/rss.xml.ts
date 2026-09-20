import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import dayjs from "dayjs";

export async function GET() {
    const num = (x: { id: string }, i: number) => Number(x.id.split("/")[i]);
    const notices = (await getCollection("notices")).sort(
        (a, b) => num(b, 0) - num(a, 0) || num(b, 1) - num(a, 1),
    );

    const container = await AstroContainer.create();

    return rss({
        title: "chrissx Media notices",
        description: "upcoming changes and maintenance",
        site: "https://chrissx.de",
        items: await Promise.all(
            notices.map(async (n) => {
                const { Content } = await render(n);
                return {
                    title: n.data.title,
                    link: `/notices/${n.id}`,
                    pubDate: dayjs(n.data.date.replace(/^(early|mid|late)\s+/i, "")).toDate(),
                    content: await container.renderToString(Content),
                };
            }),
        ),
    });
}
