import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import { cn } from "../lib/utils";

// Component for navigation links
const NavItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuLink>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuLink> & {
    href: string;
  }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <Link to={href}>
      <NavigationMenuLink
        ref={ref}
        className={cn(navigationMenuTriggerStyle(), "font-medium", className)}
        {...props}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  );
});
NavItem.displayName = "NavItem";

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">싱크홀 제보 센터</span>
        </Link>
        <NavigationMenu className="hidden md:flex mx-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavItem href="/report" title="싱크홀 제보">
                싱크홀 제보
              </NavItem>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavItem href="/heatmap" title="싱크홀 히트맵">
                싱크홀 히트맵
              </NavItem>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavItem href="/community" title="커뮤니티">
                커뮤니티
              </NavItem>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavItem href="/admin" title="제보 승인">
                제보 승인
              </NavItem>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile menu - only shown on smaller screens */}
        <div className="md:hidden ml-auto">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>메뉴</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[200px] p-2">
                    <Link
                      to="/report"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        싱크홀 제보
                      </div>
                    </Link>
                    <Link
                      to="/heatmap"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        싱크홀 히트맵
                      </div>
                    </Link>
                    <Link
                      to="/community"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        커뮤니티
                      </div>
                    </Link>
                    <Link
                      to="/admin"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        제보 승인
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}
