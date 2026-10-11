const layerButtons = document.querySelectorAll('.layer-trigger');
const selectLayer = key => {
  layerButtons.forEach(button => {
    const active = button.dataset.layer === key;
    button.setAttribute('aria-expanded', String(active));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !active;
    button.querySelector('.layer-caret').src = 'assets/product/' + (active ? 'caret-up.svg' : 'caret-down.svg');
  });
  document.querySelectorAll('.layer-hotspot').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.layer === key));
  });
};
layerButtons.forEach(button => button.addEventListener('click', () => {
  selectLayer(button.getAttribute('aria-expanded') === 'true' ? null : button.dataset.layer);
}));
document.querySelectorAll('.layer-hotspot').forEach(button => button.addEventListener('click', () => selectLayer(button.dataset.layer)));

const resizeLayers = () => {
  const width = document.querySelector('.product-page').clientWidth;
  document.documentElement.style.setProperty('--layer-scale', width / 1440);
  document.documentElement.style.setProperty('--layer-offset', '-600px');
};
resizeLayers();
window.addEventListener('resize', resizeLayers);

// Port the Figma Gradient map effect to plain Canvas. The design uses a static
// sRGB ramp, zero scatter/offset, and no repetition, so WebGPU is unnecessary.
const renderGradientMap = async () => {
  const image = new Image();
  image.src = 'assets/product/image-background.png';
  await image.decode();
  const canvas = document.querySelector('#experience-gradient');
  canvas.width = 2388;
  canvas.height = 1033;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  const stops = [[59, 88, 69], [78, 116, 91], [94.3237369, 140.2762672, 110.0443143]];
  for (let i = 0; i < pixels.data.length; i += 4) {
    const luma = (pixels.data[i] * .2126 + pixels.data[i + 1] * .7152 + pixels.data[i + 2] * .0722) / 255;
    const index = luma < .5 ? 0 : 1;
    const t = (luma - index * .5) * 2;
    for (let channel = 0; channel < 3; channel++) {
      pixels.data[i + channel] = stops[index][channel] + (stops[index + 1][channel] - stops[index][channel]) * t;
    }
  }
  context.putImageData(pixels, 0, 0);
  canvas.dataset.rendered = 'true';
};
renderGradientMap().catch(() => {
  // File URL privacy restrictions can disable pixel reads; retain the source
  // image and permit normal page interactions. Static HTTP serving enables it.
  document.querySelector('#experience-gradient').hidden = true;
});
