import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const notes = await getCollection("release-notes");

	return rss({
		title: "Release notes",
		description: `Cloudflare release notes`,
		site: "https://developers.cloudflare.com",
		trailingSlash: false,
		items: notes.map((entry) => {
			const date = new Date(entry.id.split("/").slice(0, 3).join("/"));

			return {
				title: entry.data.title,
				description: entry.data.description,
				pubDate: date,
				link: `/release-notes/${entry.slug}/`,
			};
		}),
	});
};
