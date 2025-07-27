<!-- Main starting page of the app -->
<script lang="ts">
    // 6 strings, 5 frets
    let grid = Array.from({ length: 6 }, () => Array(5).fill(false));
  
    function toggle(stringIdx: number, fretIdx: number) {
        grid[stringIdx][fretIdx] = !grid[stringIdx][fretIdx];
        // force Svelte to update
        grid = [...grid];
    }
</script>
  
<div class="chord-diagram">
    {#each grid as frets, stringIdx}
        <div class="string-row">
            {#each frets as active, fretIdx}
            <button
                class="fret-btn"
                class:active={active}
                on:click={() => toggle(stringIdx, fretIdx)}
            >
                {#if active}
                <!-- Show a dot or finger marker -->
                ●
                {/if}
            </button>
            {/each}
        </div>
        {/each}
</div>
  
<style>
    .chord-diagram {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .string-row {
        display: flex;
        gap: 4px;
    }
    .fret-btn {
        width: 40px;
        height: 40px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
    }
    .fret-btn.active {
        background: #222;
        color: #fff;
    }
</style>