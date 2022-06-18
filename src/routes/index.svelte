<script>
  export let user
</script>

<h1>Welcome to SvelteKit</h1>

{#if user}
  <p>Hi <strong>{user.name}</strong>!</p>
  <nav>
    <a href="/signout">Signout</a>
  </nav>
{:else}
  <nav>
    <a href="/signup">Signup</a>
    <a href="/signin">Signin</a>
  </nav>
{/if}
