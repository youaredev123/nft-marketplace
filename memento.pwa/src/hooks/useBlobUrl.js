import { useEffect, useState } from "react";
import image from "../assets/images/gray.png";

export function useBlobUrl(blob) {
  const [url, setUrl] = useState(image);
  useEffect(() => {
    if (blob) {
      setUrl(URL.createObjectURL(blob));
    }
  }, [blob]);
  return { url };
}
