<script>
  export let data;
</script>

<div class="container">
  <table>
    <tbody>
    {#each Object.entries(data) as [key, value]}
      <tr>
        <td>{key.replace('image', '')}</td>
        <td>
            {#if key.includes('image')}
                <img src={value} alt={key}/>
            {:else if (value.includes('http'))}
                <a href={value} target="_blank">{value}</a>
            {:else}
                {value}
            {/if}
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
</div>