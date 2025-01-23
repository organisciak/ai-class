<!-- MisalignedText.svelte -->
<script lang="ts">
    export let size = 'text-4xl';
    export let element = 'div';
    export let class_name = '';
    export let chaotic = false;
  
    // Predefined Tailwind translation classes
    const translationOptions = {
      x: ['translate-x-0.5', 'translate-x-1', 'translate-x-1.5', '-translate-x-0.5', '-translate-x-1', '-translate-x-1.5'],
      y: ['translate-y-0.5', 'translate-y-1', 'translate-y-1.5', '-translate-y-0.5', '-translate-y-1', '-translate-y-1.5']
    };
  
    let offsets;
  
    function getRandomTranslations() {
      const usedPairs = new Set();
      const getUniquePair = () => {
        let x, y;
        let pair;
        do {
          x = translationOptions.x[Math.floor(Math.random() * translationOptions.x.length)];
          y = translationOptions.y[Math.floor(Math.random() * translationOptions.y.length)];
          pair = `${x}-${y}`;
        } while (usedPairs.has(pair));
        usedPairs.add(pair);
        return { x, y };
      };
  
      return {
        cyan: chaotic ? getUniquePair() : { x: 'translate-x-0.5', y: '' },
        magenta: chaotic ? getUniquePair() : { x: '-translate-x-0.5', y: 'translate-y-0.5' },
        yellow: chaotic ? getUniquePair() : { x: '', y: '-translate-y-0.5' }
      };
    }
  
    $: offsets = getRandomTranslations();
  </script>
  
  <div class="relative font-bold {size} {class_name}">
    <!-- Main semantic text -->
    <svelte:element 
      this={element} 
      class="relative"
    >
      <slot />
    </svelte:element>
    
    <!-- Decorative layers -->
    <span 
      aria-hidden="true" 
      class="absolute top-0 left-0 text-cyan-500 mix-blend-multiply opacity-75 {offsets.cyan.x} {offsets.cyan.y}"
    >
      <slot />
    </span>
    
    <span 
      aria-hidden="true" 
      class="absolute top-0 left-0 text-pink-500 mix-blend-multiply opacity-75 {offsets.magenta.x} {offsets.magenta.y}"
    >
      <slot />
    </span>
    
    <span 
      aria-hidden="true" 
      class="absolute top-0 left-0 text-yellow-500 mix-blend-multiply opacity-75 {offsets.yellow.x} {offsets.yellow.y}"
    >
      <slot />
    </span>
  </div>