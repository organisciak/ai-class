import type { PageLoad } from './$types';
import labs from '$lib/data/labs.json';

export const load: PageLoad = async ({ params }) => {
    try {
        const post = await import(`../../../routes/labs/${params.slug}.md`);
        const labData = labs.find(lab => lab.docPath === `/labs/${params.slug}`);
        
        return {
            content: post.default,
            meta: post.metadata,
            labData
        };
    } catch (error) {
        console.error('Failed to load markdown:', error);
        throw error;
    }
}; 