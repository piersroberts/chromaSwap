function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

function rgbToHsl(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return [h, s, l];
}

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
