<script lang="ts">
  import { onMount } from 'svelte';
  
  let songs = $state<any[]>([]);
  
  onMount(async () => {
    // TODO: Fetch songs from API
  });
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Song Viewer</h1>
  
  <div class="grid gap-4">
    {#if songs.length === 0}
      <p class="text-gray-500">No songs yet. Create some chords first!</p>
    {:else}
      {#each songs as song}
        <div class="border rounded-lg p-4">
          <h2 class="text-xl font-semibold">{song.title}</h2>
        </div>
      {/each}
    {/if}
  </div>
</div>