<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import Footer from '$lib/interface/Footer.svelte';
</script>

{@render children()}

<Footer />
