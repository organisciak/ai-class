<!-- MisalignedText.svelte -->
<script lang="ts">
    export let size = 'text-4xl';
    export let element = 'div';
    export let class_name = '';
    export let chaotic = false;
    export let mouseTracking = false;
  
    // Predefined Tailwind translation classes
    const translationOptions = {
      x: ['translate-x-0.5', 'translate-x-1', 'translate-x-1.5', '-translate-x-0.5', '-translate-x-1', '-translate-x-1.5'],
      y: ['translate-y-0.5', 'translate-y-1', 'translate-y-1.5', '-translate-y-0.5', '-translate-y-1', '-translate-y-1.5']
    };
  
    let containerElement: HTMLElement;
    let mousePosition = { x: 0, y: 0 };
  
    function handleMouseMove(event: MouseEvent) {
        if (!mouseTracking) return;
        
        const rect = containerElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = Math.min(Math.abs(event.clientX - centerX) / window.innerWidth, 1);
        const distanceY = Math.min(Math.abs(event.clientY - centerY) / window.innerHeight, 1);
        
        mousePosition = { x: distanceX, y: distanceY };
        
        // Update CSS variables
        const intensityMultiplier = 3;
        containerElement.style.setProperty('--offset-cyan-x', `${0.5 * mousePosition.x * intensityMultiplier}rem`);
        containerElement.style.setProperty('--offset-cyan-y', `${0.5 * mousePosition.y * intensityMultiplier}rem`);
        containerElement.style.setProperty('--offset-magenta-x', `${-0.5 * mousePosition.x * intensityMultiplier}rem`);
        containerElement.style.setProperty('--offset-magenta-y', `${0.5 * mousePosition.y * intensityMultiplier}rem`);
        containerElement.style.setProperty('--offset-yellow-x', `${0.25 * mousePosition.x * intensityMultiplier}rem`);
        containerElement.style.setProperty('--offset-yellow-y', `${-0.5 * mousePosition.y * intensityMultiplier}rem`);
    }
  
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
  
      const baseOffsets = {
        cyan: chaotic ? getUniquePair() : { x: 'translate-x-0.5', y: '' },
        magenta: chaotic ? getUniquePair() : { x: '-translate-x-0.5', y: 'translate-y-0.5' },
        yellow: chaotic ? getUniquePair() : { x: '', y: '-translate-y-0.5' }
      };
  
      if (!mouseTracking) return baseOffsets;
  
      // Return CSS variable based translations instead
      return {
        cyan: { x: 'translate-x-[var(--offset-cyan-x)]', y: 'translate-y-[var(--offset-cyan-y)]' },
        magenta: { x: 'translate-x-[var(--offset-magenta-x)]', y: 'translate-y-[var(--offset-magenta-y)]' },
        yellow: { x: 'translate-x-[var(--offset-yellow-x)]', y: 'translate-y-[var(--offset-yellow-y)]' }
      };
    }
  
    $: offsets = getRandomTranslations();
  </script>
  
  <div 
    bind:this={containerElement}
    on:mousemove={handleMouseMove}
    on:mouseleave={() => {
        if (!containerElement) return;
        // Reset CSS variables on mouse leave
        containerElement.style.setProperty('--offset-cyan-x', '0rem');
        containerElement.style.setProperty('--offset-cyan-y', '0rem');
        containerElement.style.setProperty('--offset-magenta-x', '0rem');
        containerElement.style.setProperty('--offset-magenta-y', '0rem');
        containerElement.style.setProperty('--offset-yellow-x', '0rem');
        containerElement.style.setProperty('--offset-yellow-y', '0rem');
        mousePosition = { x: 0, y: 0 };
    }}
    class="relative font-bold {size} {class_name}"
    aria-hidden="false"
    role="presentation"
    aria-label="Text with decorative color offset effect"
  >
    <!-- Main semantic text -->
    <svelte:element 
      this={element} 
      class="relative z-10"
    >
      <slot />
    </svelte:element>
    
    <!-- Decorative layers -->
    <span 
      aria-hidden="true" 
      class="absolute top-0 left-0 text-cyan-500 mix-blend-multiply opacity-75 select-none z-0 {offsets.cyan.x} {offsets.cyan.y}"
    >
      <slot />
    </span>
    
    <span 
      aria-hidden="true" 
      class="absolute top-0 left-0 text-pink-500 mix-blend-multiply opacity-75 select-none {offsets.magenta.x} {offsets.magenta.y}"
    >
      <slot />
    </span>
    
    <span 
      aria-hidden="true" 
      class="absolute top-0 left-0 text-yellow-500 mix-blend-multiply opacity-75 select-none {offsets.yellow.x} {offsets.yellow.y}"
    >
      <slot />
    </span>
  </div>