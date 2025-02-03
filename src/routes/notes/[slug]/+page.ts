import type { PageLoad } from './$types';
import slides from '$lib/data/slides.json';

export const load: PageLoad = async ({ params }) => {
    try {
        const post = await import(`../../../routes/notes/${params.slug}.md`);
        const slideData = slides.find(slide => slide.docPath === `/notes/${params.slug}`);
        
        return {
            content: post.default,
            meta: post.metadata,
            slideData
        };
    } catch (error) {
        console.error('Failed to load markdown:', error);
        throw error;
    }
}; 