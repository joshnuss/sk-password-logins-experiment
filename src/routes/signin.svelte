<script>
  import { goto } from '$app/navigation'

  let email, password, error

  async function submit(e) {
    error = ''

    const response = await fetch('/signin.json', {
      method: 'POST',
      body: JSON.stringify({email, password})
    })

    if (response.ok) {
      goto('/')
      return
    }

    error = 'An error occurred. Please try again.'
  }
</script>

<h1>Signin</h1>

{#if error}
  <p class='error'>{error}</p>
{/if}

<form on:submit|preventDefault={submit}>
  <label>
    <span>E-mail</span>
    <input type="email" name="email" bind:value={email} required/>
  </label>

  <label>
    <span>Password</span>
    <input type="password" name="password" bind:value={password} required/>
  </label>

  <button>Submit</button>
</form>

<a href="/forgot-password">Forgot password?</a>
