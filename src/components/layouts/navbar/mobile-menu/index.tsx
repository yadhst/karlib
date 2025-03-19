import { Fragment, Suspense } from "react";

import { Links } from "../local-constants";
import Each from "@/components/utilities/each";
import MobileMenuClientScripts from "./mobile-menu-client-scripts";
import MobileMenuContainer from "./mobile-menu-container";
import MobileLink from "./mobile-link";

export default function MobileMenu() {
  return (
    <Fragment>
      <Suspense>
        <MobileMenuClientScripts />
      </Suspense>
      <MobileMenuContainer>
        <div className="flex flex-col gap-2 p-4">
          <Each of={Links}>
            {(item) => (
              <MobileLink
                key={item.label}
                href={item.href}
                label={item.label}
              />
            )}
          </Each>
        </div>
      </MobileMenuContainer>
    </Fragment>
  );
}
