export type AwaitProps<T, V = T> = ResolverProps<T, V> & {
  fallback?: React.ReactNode;
};

export type ResolverProps<T, V = T> = {
  promise: Promise<T>;
  children: (value: V) => React.ReactNode;
  errorFallback?: (error: unknown) => React.ReactNode;
  transformValue?: (value: T) => V;
};
