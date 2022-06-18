<script>
  import { goto } from '$app/navigation'

  let email, name, password, passwordConfirmation, error

  async function submit(e) {
    error = ''

    const response = await fetch('/signup.json', {
      method: 'POST',
      body: JSON.stringify({ email, name, password, passwordConfirmation })
    })

    if (response.ok) {
      goto('/confirm')
      return
    }

    error = 'An error occurred. Please try again.'
  }
</script>

<h1>Signup</h1>

{#if error}
  <p class='error'>{error}</p>
{/if}

<form on:submit|preventDefault={submit}>
  <label>
    <span>Name</span>
    <input type="text" name="name" bind:value={name} required/>
  </label>

  <label>
    <span>E-mail</span>
    <input type="email" name="email" bind:value={email} required/>
  </label>

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
