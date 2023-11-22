import { tick } from 'svelte';

// don't forget to add the view-transition-name css property to the transitioning elements
export function executeViewTransition(callback: Function) {
  // @ts-ignore
  if (!document.startViewTransition) {
    callback();
  }

  // @ts-ignore
  return document.startViewTransition(async () => {
    callback();
    await tick();
  });
}

export function combineImages(
  dataURI1: string,
  dataURI2: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a new, invisible canvas element
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    const context = canvas.getContext('2d')!;

    // Load the first image
    const image1 = new Image();
    image1.onload = () => {
      // Set canvas size to the size of the first image
      canvas.width = image1.width;
      canvas.height = image1.height;

      // Draw the first image
      context.drawImage(image1, 0, 0);

      // Load the second image
      const image2 = new Image();
      image2.onload = () => {
        // Draw the second image on top of the first
        context.drawImage(image2, 0, 0);

        // Get the combined image data URI from the canvas
        const combinedDataURI = canvas.toDataURL('image/png', 1.0);

        // Clean up: remove canvas element if you added it to the DOM
        // document.body.removeChild(canvas);

        resolve(combinedDataURI);
      };

      image2.onerror = (e) => {
        reject(e);
      };

      // Set the source of the second image
      image2.src = dataURI2;
    };

    image1.onerror = (e) => {
      reject(e);
    };

    // Set the source of the first image
    image1.src = dataURI1;
  });
}

export function combineCanvases(
  canvas1: HTMLCanvasElement,
  canvas2: HTMLCanvasElement,
  renderer: THREE.WebGLRenderer,
  desiredWidth: number = 800,
  desiredHeight: number = 800
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Store original sizes
      const originalWidth1 = canvas1.width;
      const originalHeight1 = canvas1.height;

      // Resize the Three.js renderer
      renderer.setSize(desiredWidth, desiredHeight);

      const awaitAnimationFrame = () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => resolve());
        });
      
      await awaitAnimationFrame();

      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a new canvas for the combined image
      const combinedCanvas = document.createElement('canvas');
      combinedCanvas.width = desiredWidth;
      combinedCanvas.height = desiredHeight;
      const context = combinedCanvas.getContext('2d')!;

      // Draw the first canvas onto the combined canvas
      context.drawImage(canvas1, 0, 0, desiredWidth, desiredHeight);

      // Draw the second canvas on top of the first
      context.drawImage(canvas2, 0, 0, desiredWidth, desiredHeight);

      // Get the combined image data URI from the canvas
      const combinedDataURI = combinedCanvas.toDataURL('image/png', 1.0);

      // Reset the sizes of the canvases and renderer
      renderer.setSize(originalWidth1, originalHeight1);

      resolve(combinedDataURI);
    } catch (error) {
      reject(error);
    }
  });
}
