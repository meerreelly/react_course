import React from 'react';

type ImageProps = {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}

const Image = ({src,alt, ...props }:ImageProps) => {
  return <img src={src} alt={alt} {...props} />
}

export default Image;