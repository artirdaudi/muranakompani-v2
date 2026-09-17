import { assets } from './content';

const variants = {
  [assets.hero]: [200, 435, 596, 740, 877, 960],
  [assets.drilling]: [200, 748, 1109],
  [assets.cone]: [200, 488, 683, 823, 930, 1019],
  [assets.square]: [200, 395, 536, 638, 741, 800],
  [assets.cover]: [200, 618, 882, 1093, 1259, 1400],
};

export function Photo({ src, alt, eager = false, sizes = '(max-width: 600px) 100vw, 50vw', ...props }) {
  const srcSet = variants[src]?.map(width => `${src.replace(/w_\d+/, `w_${width}`)} ${width}w`).join(', ');
  return <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" {...props} />;
}
