import { createClient } from '$lib/prismicio';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const page = await client.getByUID('blogpost', params.uid);

	return {
		page,
		title: page.data.title,
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title || page.data.title,
		meta_image: page.data.meta_image.url
	};
}

export async function entries() {
	const client = createClient();

	const pages = await client.getAllByType('blogpost');

	return pages.map((page) => {
		return { uid: page.uid };
	});
}
