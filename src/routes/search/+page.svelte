<script lang="ts">
  import type { ActionData } from './$types';
  import { Title } from '$lib/components';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  export let form: ActionData;

  let searching = false;

  let rid = '';
  let ridBtn = false;
  $: ridBtn = !/^\d+$/.test(rid);
</script>

<Title name="Search" />

<main class="flex flex-col items-center text-xl mt-10 lg:mt-20">
  <h2 class="mb-2.5">Please type your avatar's username in</h2>

  <form
    method="POST"
    action="?/search"
    use:enhance={() => {
      searching = true;

      return async ({ update }) => {
        await update();
        searching = false;
      };
    }}
  >
    <div class="join w-96 mx-auto">
      <input
        type="search"
        name="search"
        class="input input-bordered join-item w-full"
        placeholder="Search"
        autocomplete="off"
        required
        disabled={searching}
      />
      <button
        type="submit"
        class="btn btn-accent join-item normal-case"
        disabled={searching}
      >
        Search
      </button>
    </div>
  </form>
  {#if form && !searching}
    {#if form.users.length > 0}
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 m-4 lg:mt-8">
        {#each form.users as user}
          <a
            class="card w-full bg-base-200 text-content hover:bg-base-300"
            href="/editor?id={user.id}"
          >
            <div
              class="card-body text-sm lg:text-lg p-5 lg:p-8 leading-3 lg:leading-4"
            >
              <p class="font-semibold">{user.displayName}</p>
              <p class="font-medium">@{user.name}</p>
              <p>{user.id}</p>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <p class="m-8">No users found.</p>
    {/if}
  {/if}
  {#if searching}
    <span class="loading loading-spinner loading-lg my-14"></span>
  {/if}
  <br />
  <div class="lg:max-w-[30rem] m-8 flex flex-col">
    <p>
      Alternatively, you may get your Roblox ID by going to your Roblox profile
      page and copy the long number in the URL. roblox.com/users/<span
        class="text-primary">123456789</span
      >/profile
    </p>
    <div class="join mt-4 self-center">
      <input
        type="search"
        name="direct"
        class="input input-bordered join-item"
        placeholder="Roblox ID"
        autocomplete="off"
        bind:value={rid}
      />
      <button
        type="button"
        class="btn btn-primary join-item"
        disabled={ridBtn}
        on:click={() => {
          goto(`/editor?id=${rid}`);
        }}
      >
        Editor
      </button>
    </div>
  </div>
</main>
