import {hexToRgb, rgbToHsl} from './chromaLibs';

function chromaSwap(el) {
  const imageCanvas = el;
  const ctx = imageCanvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    // console.time("imageProcess");

    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );

    'bananas';
    
    const key = hexToRgb(imageCanvas.dataset.key);
    const tolerance = parseFloat(imageCanvas.dataset.tolerance);
    const [kh, hs, kl] = rgbToHsl(key.r, key.g, key.b);
    const upperThreshold = kh + tolerance;
    const lowerThreshold = kh - tolerance;
    for (let i = 0, n = imageData.data.length; i < n; i += 4) {
      const [h, s, l] = rgbToHsl(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
      if (h > lowerThreshold && h < upperThreshold && s > 0.1) {
        imageData.data[i + 3] = 255 - imageData.data[i + 1] + imageData.data[i] + imageData.data[i + 2];
        imageData.data[i] = l * 255;
        imageData.data[i + 1] = l * 255;
        imageData.data[i + 2] = l * 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    // console.timeEnd("imageProcess");
  };

  img.src = imageCanvas.dataset.src;
}

export {chromaSwap};
