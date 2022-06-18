<script>
  import { goto } from '$app/navigation'

  let email, error

  async function submit(e) {
    error = ''

    const response = await fetch('/forgot-password.json', {
      method: 'POST',
      body: JSON.stringify({ email })
    })

    if (response.ok) {
      goto('/sent')
      return
    }

    error = 'An error occurred. Please try again.'
  }
</script>

<h1>Forgot password</h1>

{#if error}
  <p class='error'>{error}</p>
{/if}

<form on:submit|preventDefault={submit}>
  <label>
    <span>E-mail</span>
    <input type="email" name="email" bind:value={email} required/>
  </label>

  <button>Submit</button>
</form>
