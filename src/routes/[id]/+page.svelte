<script>
  export let data;
</script>

<div class="container">
  <table>
    <tbody>
      {#each Object.entries(data) as [key, value]}
        <tr>
          <td>{key}</td>
          <td>
            {#if value?.startsWith("https://drive.google.com/file/d/")}
              {@const fileId = value.split("/d/")[1].split("/view")[0]}
              <img
                src={`https://drive.google.com/thumbnail?id=${fileId}`}
                alt={key}
              />
            {:else if value?.startsWith("http")}
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
