import { useState, useEffect } from "react";

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const media = matchMedia(query);
    setMatches(media.matches);

    media.addEventListener("change", (e) => setMatches(e.matches), {
      signal: controller.signal,
    });

    return () => controller.abort("cleanup listener(s)");
  }, [query]);

  return matches;
}
