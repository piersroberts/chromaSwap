# chromaSwap
_Transparent JPEGs right there in your web browser!_

Just a fun little hack that replaces the contents of `<canvas>` element with an image and replaces a colour with the alpha
channel so you can kind of almost use JPEGs as if they had a transparent background, like a chromakey! Other image formats work too.

It's a bit like the Gimps **color to alpha** in javascript.

Have a look at the index.html file to get an idea of how to use it. It's also a module so you can `import` if you want to.

There's a demo at https://chromaswap.surge.sh

Currently works on latest Chrome, Firefox and Safari (including mobile)

## Why?

Basically becasue PNGs can be enormous and if you've got a lot of them it'll eat all your bandwidth.

## Usage

```
  <canvas id="swapMe"
    style="width:100%"
    data-src="images/r8.jpg"
    data-key="#0f0"
    data-tolerance="0.1">
  </canvas>

  <script>
    chromaSwap.chromaSwap(document.querySelector('#swapMe'));
  </script>
```
