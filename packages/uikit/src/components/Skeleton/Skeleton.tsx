import classNames from "classnames";
import { PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommonProps } from "../../common/commonProps";
import { sleep } from "../../common/utils";

export interface SkeletonProps extends PropsWithChildren<CommonProps<HTMLDivElement>> {
  onLoad?: () => void;
  placeholder?: ReactElement,
  delay?: number,
};

export function Skeleton({ children, delay = 300, placeholder, onLoad }: SkeletonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  if (visible) {
    return children;
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

export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={classNames('h-2 rounded-lg py-1 bg-slate-500 transition animate-pulse', className)}
      style={{ animationDelay: '500ms', width: `${Math.round(Math.max(Math.random(), 0.25) * 1000) / 10}%` }}
    />
  )
}

export function SkeletonRectangle({ className = 'h-24 w-48' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={classNames('rounded-lg p-1 bg-slate-500 transition animate-pulse', className)} />
  )
}

export function SkeletonSquare({ className = 'h-24 w-24' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={classNames('rounded-lg p-1 bg-slate-500 transition animate-pulse', className)} />
  )
}

export function SkeletonCircle({ className = 'size-12' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={classNames('rounded-[50%] bg-slate-500 transition animate-pulse', className)} />
  )
}

export function SkeletonListItem({ className = 'size-12' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={classNames('flex space-x-4 w-full', className)}>
      <div className="size-fit">
        <SkeletonCircle />
      </div>
      <div className="flex flex-col space-y-2 w-full justify-center">
        <SkeletonRow className="h-3" />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    </div>
  )
}