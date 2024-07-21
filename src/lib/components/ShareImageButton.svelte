<script lang="ts">
  import LucideShare from '~icons/lucide/share';
  import { toast } from 'svelte-daisy-toast';

  export let getDataUriFunction: () => Promise<string | void>;

  // Function to convert a Data URI to a Blob
  function dataUriToBlob(dataUri: string): Blob {
    const byteString = atob(dataUri.split(',')[1]);
    const mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

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
      title: 'RobloGrafx',
      text: 'Create a stunning Roblox avatar picture!',
      url: 'https://robografx.com/',
    };
    const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`;

    const dataUri = await getDataUriFunction();

    // Explicitly type 'filesToShare' as 'File[]'
    let filesToShare: File[] = [];

    // Check if there's an image to share
    if (dataUri) {
      const blob = dataUriToBlob(dataUri);
      // Here, we directly create a File object from the Blob
      const file = new File([blob], 'image.png', { type: 'image/png' });
      filesToShare.push(file); // Add the file to the array
    }

    if (navigator.canShare && navigator.canShare({ files: filesToShare })) {
      try {
        await navigator.share({ ...shareData, files: filesToShare });
        toast({
          title: 'Thank you!',
          message: 'Thank you for sharing our website',
          duration: 5000,
          type: 'success',
        });
      } catch (err) {
        console.error('Error sharing content:', err);
        // Fallback to copying if sharing fails
        copyToClip(textToCopy);
      }
    } else {
      // Fallback to copying if sharing is not supported
      copyToClip(textToCopy);
    }
  }
</script>

<button on:click={shareOrCopy} class="btn btn-primary">
  Share Image<LucideShare />
</button>
