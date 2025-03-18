import { useEffect } from "react";

type UseResizeObserverCallback = ResizeObserverCallback;

export function useResizeObserver(callback: UseResizeObserverCallback) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, [callback]);
}
