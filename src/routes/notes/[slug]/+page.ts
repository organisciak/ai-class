import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    console.log('Loading slug:', params.slug);
    try {
        const post = await import(`../../../routes/notes/${params.slug}.md`);
        console.log('Post loaded:', post);
        return {
            content: post.default,
            meta: post.metadata
        };
    } catch (error) {
        console.error('Failed to load markdown:', error);
        throw error;
    }
}; 