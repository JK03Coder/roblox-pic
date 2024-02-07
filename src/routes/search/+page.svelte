<script lang="ts">
  import { Title } from '$lib/components';
  import { goto } from '$app/navigation';
  import type { UsersData, User } from '$lib/types';
  import { toast } from 'svelte-daisy-toast';

  let searching = false;
  let users: User[] = [];
  let searchInput = '';
  let rid = '';
  let ridBtn = false;
  let lastSearchTime = 0;
  const RATE_LIMIT_PERIOD_MS = 5000;
  let firstLoad = true;
  let searchFailed = false;

  $: isSearchValid = searchInput.trim().length >= 3;

  $: ridBtn = !/^\d+$/.test(rid);

  function canSearch(): boolean {
    const now = Date.now();
    return now - lastSearchTime > RATE_LIMIT_PERIOD_MS;
  }

  async function searchUsers(username: string) {
    if (!canSearch()) {
      toast({
        title: 'Info',
        message: 'Please wait before searching again.',
        duration: RATE_LIMIT_PERIOD_MS,
        type: 'info',
      });
      return;
    }
    lastSearchTime = Date.now();
    searching = true;
    users = [];
    firstLoad = false;
    searchFailed = false;

    try {
      const response = await fetch(
        `https://users.roproxy.com/v1/users/search?keyword=${username}&limit=10`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: 'Info',
            message: 'Please wait before searching again.',
            duration: RATE_LIMIT_PERIOD_MS,
            type: 'info',
          });
          searchFailed = true;
          return;
        }
        throw new Error('Failed to fetch users');
      }

      const data: UsersData = await response.json();
      users = data.data.map(({ id, name, displayName }) => ({
        id,
        name,
        displayName,
      }));
    } catch (error) {
      searchFailed = true;
      if (error instanceof Error) {
        toast({
          title: 'Error',
          message: error.message,
          duration: RATE_LIMIT_PERIOD_MS,
          type: 'error',
        });
      } else {
        toast({
          title: 'Error',
          message: 'An unexpected error occurred',
          duration: RATE_LIMIT_PERIOD_MS,
          type: 'error',
        });
      }
    } finally {
      searching = false;
    }
  }

  function handleSearch(e: SubmitEvent) {
    e.preventDefault(); // Prevent the form from submitting traditionally
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('search');
    if (username) {
      searchUsers(username.toString());
    }
  }
</script>

<Title name="Search" />

<div class="flex flex-col items-center text-xl mt-10 lg:mt-20">
  <h2 class="mb-2.5 max-sm:text-sm">Please type your avatar's username in</h2>

  <form on:submit={handleSearch} class="join lg:w-96 lg:mx-auto">
    <input
      type="search"
      name="search"
      bind:value={searchInput}
      class="input input-bordered max-sm:input-sm join-item lg:w-full"
      placeholder="Search"
      autocomplete="off"
      required
      disabled={searching}
    />
    <button
      type="submit"
      class="btn max-sm:btn-sm btn-accent join-item normal-case"
      disabled={searching || !isSearchValid}
    >
      Search
    </button>
  </form>

  <!-- TODO when clicking a user add some user feedback they know -->

  {#if users.length > 0}
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 m-4 lg:mt-8">
      {#each users as user}
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
  {:else if !searching && !firstLoad && !searchFailed}
    <p class="m-8">No users found.</p>
  {/if}

  {#if searching}
    <span class="loading loading-spinner loading-lg my-14"></span>
  {/if}

  <br />
  <div class="lg:max-w-[30rem] m-8 flex flex-col">
    <p class="max-sm:text-sm">
      Alternatively, you may get your Roblox ID by going to your Roblox profile
      page and copy the long number in the URL. roblox.com/users/<span
        class="text-primary">123456789</span
      >/profile
    </p>
    <div class="join mt-4 self-center">
      <input
        type="search"
        name="direct"
        class="input max-sm:input-sm input-bordered join-item"
        placeholder="Roblox ID"
        autocomplete="off"
        bind:value={rid}
      />
      <button
        type="button"
        class="btn max-sm:btn-sm btn-primary join-item"
        disabled={ridBtn}
        on:click={() => {
          goto(`/editor?id=${rid}`);
        }}
      >
        Editor
      </button>
    </div>
  </div>
</div>
