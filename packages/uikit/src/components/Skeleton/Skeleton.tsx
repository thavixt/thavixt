import classNames from "classnames";
import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { sleep } from "../../common/utils";

export interface SkeletonProps extends CommonProps<HTMLDivElement> {
  onLoad: () => Promise<ReactElement>;
  placeholder?: ReactElement,
  delay?: number,
};

export function Skeleton({ delay = 300, placeholder, onLoad }: SkeletonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const contentRef = useRef<ReactElement>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }
    (async function SkeletonOnLoad() {
      try {
        contentRef.current = await onLoad();
      } catch (e) {
        console.error('Error while loading Skeleton content.');
        throw e as Error;
      }
      await sleep(250);
      setContentLoaded(true);
    }());
  }, [onLoad, visible]);

  const options: IntersectionObserverInit = useMemo(() => ({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }), []);

  const callbackFn: IntersectionObserverCallback = useCallback(async ([entry]) => {
    if (visible) {
      return;
    }
    await sleep(delay);
    setVisible(entry.isIntersecting);
    if (entry.isIntersecting) {
      onLoad?.();
    }
  }, [delay, onLoad, visible]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(callbackFn, options);
    const currentRef = ref.current;
    if (currentRef) {
      intersectionObserver.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        intersectionObserver.unobserve(currentRef);
      }
    }
  }, [callbackFn, options]);

  if (contentLoaded) {
    return contentRef.current;
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="size-full"
      data-testid="Skeleton"
    >
      {placeholder ?? <SkeletonListItem />}
    </div>
  )
}

export function SkeletonRow({ className = 'w-full' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={classNames('h-2 rounded-lg py-1 bg-slate-400 transition animate-pulse', className)}
    />
  )
}

export function SkeletonRectangle({ className = 'h-24 w-48' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={classNames('rounded-lg p-1 bg-slate-400 transition animate-pulse', className)} />
  )
}

export function SkeletonSquare({ className = 'h-24 w-24' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={classNames('rounded-lg p-1 bg-slate-400 transition animate-pulse', className)} />
  )
}

export function SkeletonCircle({ className = 'size-12' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={classNames('rounded-[50%] bg-slate-400 transition animate-pulse', className)} />
  )
}

export function SkeletonListItem({ className = 'size-12' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={classNames('flex space-x-4 w-full', className)}>
      <div className="size-fit">
        <SkeletonCircle />
      </div>
      <div className="flex flex-col space-y-2 w-full justify-center">
        <SkeletonRow className="w-3/4 h-3" />
        <SkeletonRow className="w-1/2" />
        <SkeletonRow className="w-1/3" />
      </div>
    </div>
  )
}