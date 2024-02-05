<script lang="ts">
  import LucideShare2 from '~icons/lucide/share-2';
  import { toast } from 'svelte-daisy-toast';

  async function copyToClip(textToCopy: string) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: 'Share!',
        message: 'Copied to clipboard',
        duration: 5000,
        type: 'success',
      });
    } catch (err) {
      console.error('Failed to copy content: ', err);
      toast({
        title: 'Error',
        message: 'Failed to copy content to clipboard.',
        duration: 5000,
        type: 'error',
      });
    }
  }

  async function shareOrCopy() {
    const shareData = {
      title: 'Roblox Picture',
      text: 'Make your Roblox profile picture!',
      url: 'https://yourwebsite.com/',
    };
    const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`;

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: 'Thank you!',
          message: 'Thank you for sharing our website',
          duration: 5000,
          type: 'success',
        });
      } catch (err) {
        console.error('Error sharing content:', err);
        copyToClip(textToCopy);
      }
    } else {
      copyToClip(textToCopy);
    }
  }
</script>

<button on:click={shareOrCopy} class="btn btn-primary"
  >Share<LucideShare2 /></button
>
