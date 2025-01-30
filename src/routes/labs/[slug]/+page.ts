import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    try {
        const post = await import(`../../../routes/labs/${params.slug}.md`);
        return {
            content: post.default,
            meta: post.metadata
        };
    } catch (error) {
        console.error('Failed to load markdown:', error);
        throw error;
    }
}; 