import { Children } from "react";

type EachProps<T> = {
  of: T[];
  fallback?: React.ReactNode;
  children: (value: T, index: number) => React.ReactNode;
};
export default function Each<T>({ of, fallback, children }: EachProps<T>) {
  return of.length >= 1
    ? Children.toArray(of.map((child, index) => children(child, index)))
    : (fallback ?? null);
}
