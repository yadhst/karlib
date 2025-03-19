"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";
import { Show } from "@/components/utilities/conditional";

type LazyImageProps = Omit<ImageProps, "unoptimized" | "loading">;
export default function LazyImage({
  style,
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative size-full">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...props}
        unoptimized
        loading="lazy"
        style={{ opacity: !isLoaded || isError ? 0 : 1, ...style }}
        onLoad={(...args) => {
          onLoad?.(...args);
          setIsLoaded(true);
        }}
        onError={(...args) => {
          onError?.(...args);
          setIsError(true);
        }}
      />
      <Show when={!isLoaded}>
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            isError
              ? "bg-destructive text-destructive-foreground"
              : "bg-muted text-muted-foreground animate-pulse",
          )}
        >
          <Show when={isError}>
            <div className="flex size-full items-center justify-center">
              <span className="text-sm">Failed to Load Image</span>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}
