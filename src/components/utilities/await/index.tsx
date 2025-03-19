import { Suspense } from "react";

import type { AwaitProps, ResolverProps } from "./types";

export default function Await<T, V = T>({
  fallback,
  ...props
}: AwaitProps<T, V>) {
  return (
    <Suspense name="Await" fallback={fallback ?? null}>
      <Resolver {...props} />
    </Suspense>
  );
}

async function Resolver<T, V = T>({
  promise,
  children,
  errorFallback,
  transformValue,
}: ResolverProps<T, V>) {
  try {
    const value = await promise;
    const transformedValue = transformValue?.(value) ?? (value as V);
    return children(transformedValue);
  } catch (error) {
    return errorFallback?.(error) ?? null;
  }
}
