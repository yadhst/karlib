import {
  rules,
  type Rule,
  type Resource,
  type ResourceDataType,
  type PermissionCheck,
  type PropertyBasedPermissionCheck,
} from "./rules";
import type { User } from "@/lib/database/schema";

function isPropertyBasedRule<R extends keyof Resource>(
  rule: PermissionCheck<R>,
): rule is PropertyBasedPermissionCheck<R> {
  return typeof rule === "object" && "granted" in rule;
}

export type CheckOptions<R extends keyof Resource> = {
  target?: ResourceDataType<R>;
  payloadKeys?: (keyof ResourceDataType<R>)[];
};
export function checkPermission<
  R extends keyof Resource,
  A extends Resource[R]["action"],
>(user: User, action: A, resource: R, options?: CheckOptions<R>) {
  try {
    const rule = (rules as Rule)[user.role][resource][action];

    if (typeof rule === "boolean") return rule;
    if (typeof rule === "function") return rule(user, options!.target!);

    if (isPropertyBasedRule(rule)) {
      const isGranted =
        typeof rule.granted === "boolean"
          ? rule.granted
          : rule.granted(user, options!.target!);

      if (!options?.payloadKeys?.length) return isGranted;

      const isPropertyAccessDenied = options.payloadKeys.some((key) => {
        if (rule.restrictedProperties?.length)
          return !rule.restrictedProperties.includes(key);

        if (rule.deniedProperties?.length)
          return rule.deniedProperties.includes(key);

        return false;
      });

      return isGranted && !isPropertyAccessDenied;
    }

    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}
