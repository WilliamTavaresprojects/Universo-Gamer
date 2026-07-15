import { useEffect, useState } from "react";

interface TransparentLogoProps {
  src: string;
  alt: string;
  className?: string;
  darkMode?: boolean;
}

export default function TransparentLogo({ src, alt, className, darkMode = true }: TransparentLogoProps) {
  const [processedSrc, setProcessedSrc] = useState<string>(src);
  const [useFallback, setUseFallback] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setUseFallback(true);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Remove black or near-black background pixels
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If pixel is very dark (black background), set alpha (transparency) to 0
          if (r < 40 && g < 40 && b < 40) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL());
        setUseFallback(false);
      } catch (err) {
        console.warn("Canvas background removal failed (possibly CORS). Using CSS blend fallback.", err);
        setUseFallback(true);
      }
    };

    img.onerror = () => {
      setUseFallback(true);
    };
  }, [src]);

  // If Canvas manipulation is blocked (CORS), use advanced CSS fallbacks:
  // In dark mode: mix-blend-screen lets the black logo background blend out.
  // In light mode: invert(1) turns black to white (which blends out via multiply) and white to black.
  const fallbackClass = useFallback
    ? darkMode
      ? "mix-blend-screen bg-transparent"
      : "invert mix-blend-multiply bg-transparent"
    : "";

  return (
    <img
      src={processedSrc}
      alt={alt}
      className={`${className} ${fallbackClass}`}
      referrerPolicy="no-referrer"
    />
  );
}
