import Compressor from 'compressorjs';

export function compressImage(image) {
  // set the options
  const options = {
    success: (compressResult) => {
      return compressResult;
    },
  };

  // calculate compression amount by filesize and add the amount to the options
  const quality = 200000 / image.size;
  options.quality = quality;

  // compress the img
  return new Compressor(image, options);
}
