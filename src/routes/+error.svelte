<script>
  import { page } from '$app/stores';
  import MisalignedH3 from '$lib/components/ui/misalignedText/MisalignedH3.svelte';
  import SimpleHeader from '$lib/interface/SimpleHeader.svelte';
</script>

<SimpleHeader />
<div class="container mx-auto max-w-screen-md py-8 px-4 workbench-gfont"> 
  <MisalignedH3 class_name="workbench-gfont">Page not found</MisalignedH3>
  <a href="/" class="hover:underline text-blue-500">Go back to the homepage</a>
</div> 