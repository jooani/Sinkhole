import * as React from "react";
import { cn } from "../../lib/utils"

export const NavigationMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn("relative z-10", className)} {...props} />
));
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex items-center space-x-4 list-none p-0 m-0", className)}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
));
NavigationMenuItem.displayName = "NavigationMenuItem";

export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("text-sm font-medium hover:underline underline-offset-4", className)}
    {...props}
  />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

export const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-between rounded-md border px-4 py-2 text-sm font-medium bg-white hover:bg-gray-50",
      className
    )}
    {...props}
  />
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute top-full left-0 mt-2 w-56 rounded-md border bg-white shadow-lg p-2",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

// 기본 스타일 유틸리티 (추가적인 스타일링에 사용)
export const navigationMenuTriggerStyle = () =>
  "text-sm px-4 py-2 rounded-md transition-colors hover:bg-gray-100";