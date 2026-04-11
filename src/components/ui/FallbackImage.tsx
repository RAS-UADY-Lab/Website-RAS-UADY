"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface FallbackImageProps extends ImageProps {}

export default function FallbackImage({
  src,
  alt,
  ...props
}: FallbackImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-neutral-100 text-neutral-400 border-none m-0 p-0 ${props.className || ""}`}
        style={{ width: props.width || "100%", height: props.height || "100%" }}
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Sin Imagen
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
      className={`block m-0 p-0 ${props.className || ""}`} // Forzamos comportamiento en bloque y sin márgenes/rellenos
    />
  );
}
