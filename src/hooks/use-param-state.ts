import { useRouter, useSearchParams } from "next/navigation";

export default function useParamState(key: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = searchParams.get(key);

  const setState = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  return [state, setState] as const;
}
