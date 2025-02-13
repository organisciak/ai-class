export async function loadDataset(name: string) {
    try {
        const dataset = await import(`../data/datasets/${name}.json`);
        return dataset.default;
    } catch (error) {
        console.error(`Failed to load dataset: ${name}`, error);
        throw new Error(`Failed to load dataset: ${name}`);
    }
} 