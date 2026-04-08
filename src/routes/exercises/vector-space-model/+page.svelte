<script lang="ts">
    import SimpleHeader from '$lib/interface/SimpleHeader.svelte';
    import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
    title="Vector Space Model Exercise"
    titleTemplate="%s | AI Literacy"
    description="In-class exercise: plot document word counts in 3D, then normalize to unit vectors."
/>

<SimpleHeader />

<div class="container mx-auto max-w-screen-md py-8 px-4 exercise">
    <article class="prose prose-slate dark:prose-invert max-w-none
                    prose-headings:scroll-m-20
                    prose-h1:text-3xl prose-h1:josefin-sans-gfont prose-h1:font-extrabold
                    prose-h2:text-2xl prose-h2:josefin-sans-gfont prose-h2:font-semibold
                    prose-h3:text-xl prose-h3:font-semibold
                    prose-a:text-primary">

        <div class="no-print mb-6 flex items-center justify-between border-b pb-4">
            <span class="text-sm text-slate-500">Week 2 · In-class exercise</span>
            <button
                onclick={() => window.print()}
                class="rounded border px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >Print / Save PDF</button>
        </div>

        <h1>Vector Space Model: A Physical Exercise</h1>

        <p><em>Goal:</em> build a document vector space using nothing but word counts, plot documents as points in 3D, and see what "similarity as distance" actually means.</p>

        <h2>The setup</h2>

        <p>Three words are our axes. Each document's coordinate on an axis is how many times that word appears.</p>

        <ul>
            <li><strong>X axis — <code>data</code></strong> (floor, 0–6) — marked with <em>tape or post-it notes</em></li>
            <li><strong>Y axis — <code>people</code></strong> (floor, 0–6) — marked with <em>tape or post-it notes</em></li>
            <li><strong>Z axis — <code>library</code></strong> (height, 0–3) — marked with <em>twine or a post-it held overhead</em></li>
        </ul>

        <p><strong>Each person takes one document.</strong> Read your paragraph, count the three words, then walk to your point on the floor. Raise the twine (or post-it) to the right height for <code>library</code>. You <em>are</em> the document vector.</p>

        <h2>Part 1 — Count your document</h2>

        <p>Count <code>data</code>, <code>people</code>, and <code>library</code> in your paragraph. Case-insensitive; exact word matches only. Then place yourself at your point.</p>

        <h3>Doc 1 — "The Reading Room"</h3>
        <blockquote>The library was quiet on Sunday afternoon. A few people sat by the window with books open on their laps. The library smelled of old paper and floor polish. Every library I have known has had that same smell.</blockquote>

        <h3>Doc 2 — "Census Report"</h3>
        <blockquote>The census data arrived in March. Analysts cleaned the data, cross-checked it against prior data, and published a summary showing how many people had moved between counties. The data suggested that younger people were leaving rural areas, while older people stayed. More data is expected next quarter.</blockquote>

        <h3>Doc 3 — "Digital Library Project"</h3>
        <blockquote>The library launched a new data portal this spring. Patrons can now search library catalog data and download open data sets. The library hopes the data will help people doing local history research. Early usage data looks promising.</blockquote>

        <h3>Doc 4 — "The Protest"</h3>
        <blockquote>Thousands of people gathered in the square. Young people chanted while older people held signs. Reporters asked people why they had come. People answered that they were tired of being ignored, and that people deserved to be heard.</blockquote>

        <h3>Doc 5 — "Machine Learning Intro"</h3>
        <blockquote>Machine learning models are trained on large amounts of data. The quality of the data matters more than the quantity. Clean data produces better models than messy data. Most practitioners spend the majority of their time preparing data rather than tuning algorithms. Bad data, bad model.</blockquote>

        <h3>Doc 6 — "Community Librarian"</h3>
        <blockquote>The library hired a community librarian last fall. Her job is to meet people where they are — at senior centers, at schools, at the farmers' market. She brings books, sign-up forms, and a little usage data back to the library each week. People seem to like her.</blockquote>

        <table>
            <thead>
                <tr><th>Your doc</th><th>data (X)</th><th>people (Y)</th><th>library (Z)</th></tr>
            </thead>
            <tbody>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            </tbody>
        </table>

        <p><em>Look around.</em> Who's close to you? Does the geometry match your sense of which documents are about the same thing?</p>

        <h2>Part 2 — Run some queries</h2>

        <p>A query is a tiny document — just a bag of words. We place it in the same space and look for the nearest person.</p>

        <table>
            <thead>
                <tr><th>Query</th><th>data</th><th>people</th><th>library</th><th>Nearest doc?</th></tr>
            </thead>
            <tbody>
                <tr><td>Q1: <code>data data data</code></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>Q2: <code>library people</code></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>Q3: <code>data library</code></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>Q4: <code>people people people people</code></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>Q5: <code>data people library</code></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            </tbody>
        </table>

        <p><strong>Discussion:</strong> Q1 is "data data data" and lands at (3, 0, 0). But Doc 5 (ML Intro) is at (6, 0, 0). They are about the exact same thing, yet they're far apart by Euclidean distance. Why? What's wrong with raw counts?</p>

        <h2>Part 3 — Normalize to unit length</h2>

        <p>The problem: <em>longer documents look "further away" even when they point in the same direction</em>. A doc that says "data" six times and a query that says "data" three times should be a perfect match — same direction, different magnitude.</p>

        <p>The fix: <strong>every document gets the same length of twine</strong>. Nobody stretches further from the origin than anyone else — you just keep your <em>angle</em> and walk inward (or outward) until you're at the end of your twine.</p>

        <p style="text-align: center;"><code>||v|| = √(x² + y² + z²)</code> &nbsp; → &nbsp; <code>v̂ = v / ||v||</code></p>

        <p>Now every document sits on the surface of a sphere of radius 1. What matters is the <em>direction</em> you point, not how far you'd gone.</p>

        <p><em>Re-run the queries with normalized vectors.</em> Does Q1 now match Doc 5 exactly?</p>
    </article>
</div>

<style>
    @media print {
        :global(header),
        .no-print {
            display: none !important;
        }
        .exercise {
            max-width: 100% !important;
            padding: 0 !important;
        }
        :global(body) {
            font-size: 11pt;
        }
        blockquote {
            page-break-inside: avoid;
        }
        table {
            page-break-inside: avoid;
        }
        h2, h3 {
            page-break-after: avoid;
        }
    }
    article :global(table) {
        width: 100%;
        border-collapse: collapse;
    }
    article :global(th),
    article :global(td) {
        border: 1px solid #cbd5e1;
        padding: 0.4rem 0.6rem;
        text-align: left;
    }
    article :global(tbody td:not(:first-child)) {
        min-width: 3rem;
        height: 2rem;
    }
</style>
