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
            {#if value.startsWith("https://drive.google.com/file/d/")}
              <img
                src={value
                  .replace("file/d/", "thumbnail?id=")
                  .replace("/view?usp=drive_link", "")}
                alt={key}
              />
            {:else if value.startsWith("http")}
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
