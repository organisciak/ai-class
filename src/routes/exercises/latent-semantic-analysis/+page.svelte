<script lang="ts">
    import SimpleHeader from '$lib/interface/SimpleHeader.svelte';
    import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
    title="Latent Semantic Analysis Exercise"
    titleTemplate="%s | AI Literacy"
    description="In-class exercise: re-plot documents in a 3-topic latent space and see why synonyms cluster together."
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
            <span class="text-sm text-slate-500">Week 2 · In-class exercise (LSA)</span>
            <button
                onclick={() => window.print()}
                class="rounded border px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >Print / Save PDF</button>
        </div>

        <h1>Latent Semantic Analysis: Re-plotting in Topic Space</h1>

        <p><em>Goal:</em> see what changes when our axes are no longer raw words but <strong>latent topics</strong>. Synonyms collapse onto the same axis. Documents that share <em>meaning</em> — but not vocabulary — finally end up close to each other.</p>

        <h2>The setup</h2>

        <p>Same room, same grid, same twine. But the axes are different.</p>

        <ul>
            <li><strong>X — Topic A: <em>information / records</em></strong> &nbsp; <span class="text-sm">(words like <code>data</code>, <code>dataset</code>, <code>records</code>, <code>numbers</code>, <code>statistics</code>)</span></li>
            <li><strong>Y — Topic B: <em>community / patrons</em></strong> &nbsp; <span class="text-sm">(words like <code>people</code>, <code>folks</code>, <code>community</code>, <code>residents</code>, <code>patrons</code>)</span></li>
            <li><strong>Z — Topic C: <em>institution / library</em></strong> &nbsp; <span class="text-sm">(words like <code>library</code>, <code>archive</code>, <code>stacks</code>, <code>branch</code>, <code>collection</code>)</span></li>
        </ul>

        <p>A topic isn't a single word — it's a cluster of words that tend to mean the same kind of thing. LSA discovers these clusters automatically from a large corpus by noticing which words keep showing up in the same documents. We'll skip the math and pretend it's already been done.</p>

        <p><strong>Each person gets one document.</strong> Your doc has been pre-scored on each topic (0–3). Walk to your point. Raise your twine to your Topic C value.</p>

        <h2>Part 1 — Place yourself</h2>

        <p>The same six documents from the previous exercise, plus three new ones. The new ones use <em>different vocabulary</em> for the same ideas. Notice that the raw-word exercise would have placed them at the origin or near it — but in topic space, they land somewhere meaningful.</p>

        <table>
            <thead>
                <tr><th>Document</th><th>A: information</th><th>B: community</th><th>C: institution</th></tr>
            </thead>
            <tbody>
                <tr><td>Doc 1 — Reading Room</td><td>0</td><td>1</td><td>3</td></tr>
                <tr><td>Doc 2 — Census Report</td><td>3</td><td>2</td><td>0</td></tr>
                <tr><td>Doc 3 — Digital Library Project</td><td>3</td><td>1</td><td>3</td></tr>
                <tr><td>Doc 4 — The Protest</td><td>0</td><td>3</td><td>0</td></tr>
                <tr><td>Doc 5 — ML Intro</td><td>3</td><td>0</td><td>0</td></tr>
                <tr><td>Doc 6 — Community Librarian</td><td>1</td><td>2</td><td>2</td></tr>
                <tr><td><strong>Doc 7 (NEW) — "The Archive"</strong></td><td>0</td><td>1</td><td>3</td></tr>
                <tr><td><strong>Doc 8 (NEW) — "Town Survey"</strong></td><td>3</td><td>2</td><td>0</td></tr>
                <tr><td><strong>Doc 9 (NEW) — "Branch Open House"</strong></td><td>1</td><td>2</td><td>2</td></tr>
            </tbody>
        </table>

        <h3>The new documents</h3>

        <p><strong>Doc 7 — "The Archive"</strong></p>
        <blockquote>The old archive in the basement holds bound newspapers from the 1890s. A few patrons sit at the wooden tables turning brittle pages. The stacks smell of dust and varnish.</blockquote>

        <p><strong>Doc 8 — "Town Survey"</strong></p>
        <blockquote>The town survey collected records from every household this fall. Numbers from the survey suggest that residents are aging in place. Statistics will be released next month after researchers finish cross-checking the survey responses.</blockquote>

        <p><strong>Doc 9 — "Branch Open House"</strong></p>
        <blockquote>The new branch opened its doors on Saturday. Folks from the neighborhood toured the collection, met staff, and signed up for cards. Early sign-up numbers from the open house look promising.</blockquote>

        <h2>Part 2 — Discussion</h2>

        <p><strong>Doc 7 ("The Archive") and Doc 1 ("Reading Room")</strong> use almost no overlapping vocabulary — Doc 7 doesn't contain the word "library" or "people" at all. In the raw-word exercise, Doc 7 would have been at the origin. Now it's standing on top of Doc 1. Why?</p>

        <p><strong>Doc 8 ("Town Survey")</strong> never says "data" or "people." But it lands next to Doc 2 ("Census Report"). What did the topic axes do for us that raw word counts couldn't?</p>

        <p><strong>Doc 9 ("Branch Open House")</strong> never says "library" or "people" either, yet it ends up right next to Doc 6. This is the synonymy problem solved.</p>

        <p>What does it cost us? Where does this go wrong? (Hints: who decided what the topics are? what if a word means two different things?)</p>
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
        blockquote { page-break-inside: avoid; }
        table { page-break-inside: avoid; }
        h2, h3 { page-break-after: avoid; }
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
</style>
