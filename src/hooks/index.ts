import { useEffect, useState } from 'react';

import { getImgUrl } from 'utils';
import Painting from 'interfaces';

export function useImgOnload(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);

  function imgOnload() {
    const img = new Image();
    img.src = src;
    img.decode().then(() => setIsLoaded(true));
  }

  useEffect(imgOnload, []);

  return isLoaded;
}

export function useImgsOnload(variants: Painting[]) {
  const [isLoaded, setIsLoaded] = useState(false);

  function imgsOnload() {
    const promises = variants.map(({ imageNum }) => {
      const img = new Image();
      img.src = getImgUrl(imageNum, '');
      return img.decode();
    });
    Promise.all(promises).then(() => setIsLoaded(true));
  }

  useEffect(imgsOnload, []);

  return isLoaded;
}
