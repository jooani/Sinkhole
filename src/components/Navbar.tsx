import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const NavItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuLink>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuLink> & {
    href: string;
    onClick?: () => void;
  }
>(({ className, children, href, onClick, ...props }, ref) => {
  return (
    <Link to={href} onClick={onClick}>
      <NavigationMenuLink
        ref={ref}
        className={cn(
          navigationMenuTriggerStyle(),
          "font-medium",
          "text-gray-100 dark:text-gray-100",
          className
        )}
        {...props}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  );
});
NavItem.displayName = "NavItem";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        setUserRole(payload.role);
      } catch (e) {
        console.error("JWT 디코딩 실패:", e);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, [location]);

  return (
    <div className="border-b bg-gray-900 text-white dark:bg-gray-900 dark:text-white">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">싱크홀 제보 센터</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavItem href="/report">싱크홀 제보</NavItem>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavItem href="/heatmap">싱크홀 히트맵</NavItem>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavItem href="/community">커뮤니티</NavItem>
            </NavigationMenuItem>
            {userRole === "ADMIN" && (
              <NavigationMenuItem>
                <NavItem href="/admin">제보 승인</NavItem>
              </NavigationMenuItem>
            )}

            {isLoggedIn ? (
              <NavigationMenuItem>
                <NavItem href="#" onClick={handleLogout}>
                  로그아웃
                </NavItem>
              </NavigationMenuItem>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavItem href="/login">로그인</NavItem>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavItem href="/signup">회원가입</NavItem>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="md:hidden ml-auto">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white">
                  메뉴
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 text-white shadow-lg rounded-md">
                  <div className="w-[200px] p-2">
                    <Link to="/report" className="block p-2 hover:underline">
                      싱크홀 제보
                    </Link>
                    <Link to="/heatmap" className="block p-2 hover:underline">
                      싱크홀 히트맵
                    </Link>
                    <Link to="/community" className="block p-2 hover:underline">
                      커뮤니티
                    </Link>
                    <Link to="/admin" className="block p-2 hover:underline">
                      제보 승인
                    </Link>
                    {isLoggedIn ? (
                      <button
                        onClick={handleLogout}
                        className="block p-2 text-left w-full hover:underline"
                      >
                        로그아웃
                      </button>
                    ) : (
                      <>
                        <Link to="/login" className="block p-2 hover:underline">
                          로그인
                        </Link>
                        <Link
                          to="/signup"
                          className="block p-2 hover:underline"
                        >
                          회원가입
                        </Link>
                      </>
                    )}
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
