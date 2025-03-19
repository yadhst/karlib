import Link from "next/link";

import { Links } from "./local-constants";
import BrandWithoutText from "@/components/icons/brand-icon/without-text";
import Each from "@/components/utilities/each";
import NavbarContainer from "./navbar-container";
import NavbarBorder from "./navbar-border";
import ThemeSwitcher from "./theme-switcher";
import UserAuthentication from "./user-authentication";
import DesktopLink from "./desktop-link";
import MobileMenuToggler from "./mobile-menu/mobile-menu-toggler";
import MobileMenu from "./mobile-menu";
import { MobileMenuProvider } from "./mobile-menu/mobile-menu-context";
import { FupContainer, FupChild } from "@/components/animations/fade-in-up";

export default function Navbar() {
  return (
    <MobileMenuProvider>
      <NavbarContainer>
        <FupContainer
          className="layout-container flex items-center gap-1 py-4"
          inView={false}
        >
          <FupChild as={Link} href="/" className="flex-1">
            <div className="flex items-center gap-1">
              <BrandWithoutText className="size-9" />
              <span className="font-(family-name:--font-merriweather) text-xl font-black">
                Karlib<span className="text-primary">112</span>
              </span>
            </div>
          </FupChild>
          <FupChild as="nav" className="flex items-center gap-6 max-md:hidden">
            <Each of={Links}>
              {(item) => (
                <DesktopLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                />
              )}
            </Each>
          </FupChild>
          <FupChild className="flex flex-1 items-center justify-end gap-3">
            <UserAuthentication />
            <ThemeSwitcher />
            <MobileMenuToggler />
          </FupChild>
        </FupContainer>
        <MobileMenu />
        <NavbarBorder />
      </NavbarContainer>
    </MobileMenuProvider>
  );
}
