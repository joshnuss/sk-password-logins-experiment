<script>
  import { goto } from '$app/navigation'

  let error, password, passwordConfirmation

  async function submit(e) {
    error = ''
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')

    const response = await fetch('/reset-password.json', {
      method: 'POST',
      body: JSON.stringify({ code, password, passwordConfirmation })
    })

    if (response.ok) {
      goto('/')
      return
    }

    error = 'An error occurred. Please try again.'
  }
</script>

<h1>Reset password</h1>

{#if error}
  <p class='error'>{error}</p>
{/if}

<form on:submit|preventDefault={submit}>
  <label>
    <span>Password</span>
    <input type="password" name="password" bind:value={password} required/>
  </label>

  <label>
    <span>Confirm Password</span>
    <input type="password" name="password_confirmation" bind:value={passwordConfirmation} required/>
  </label>

  <button>Submit</button>
</form>
