"use client";

import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import type { AwaitProps, ResolverProps } from "../types";

export default function AwaitClient<T, V = T>({
  fallback,
  errorFallback,
  ...props
}: AwaitProps<T, V>) {
  return (
    <ErrorBoundary fallbackRender={({ error }) => errorFallback?.(error)}>
      <Suspense name="AwaitClient" fallback={fallback ?? null}>
        <ResolverClient {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

function ResolverClient<T, V = T>({
  promise,
  children,
  transformValue,
}: Omit<ResolverProps<T, V>, "errorFallback">) {
  const value = use(promise);
  const transformedValue = transformValue?.(value) ?? (value as unknown as V);
  return children(transformedValue);
}
