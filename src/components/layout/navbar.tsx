"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSession, signOut } from "next-auth/react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { numOfCartItems } = useSelector((state: RootState) => state.cart);
  const { count: wishlistCount } = useSelector((state: RootState) => state.wishlist);
  const { data: session, status } = useSession();

  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/categories", label: "Categories" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl">ShopMart</span>
          </Link>

          <nav className="hidden lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link href={item.href} className={cn("group hover:bg-primary hover:text-primary-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors", isActive ? "bg-primary text-primary-foreground shadow-md font-semibold" : "bg-background focus:bg-accent focus:text-accent-foreground")}>{item.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              {status === "loading" ? "..." : status === "authenticated" ? (
                <>
                  <span className="hidden md:block text-sm text-muted-foreground">Hi, {session.user?.name}</span>
                  <Button onClick={() => signOut()} variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button>
                </>
              ) : (
                <Link href="/auth/login" className="text-sm">Sign in</Link>
              )}
            </div>

            {status === "authenticated" && (
              <>
                <Button variant="ghost" size="icon" className="relative" asChild>
                  <Link href="/wishlist">
                    <Heart className="h-5 w-5 text-red-500" />
                    {wishlistCount > 0 && <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">{wishlistCount}</span>}
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="relative" asChild>
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">{numOfCartItems}</span>
                  </Link>
                </Button>
              </>
            )}

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background py-4 animate-in fade-in slide-in-from-top-1">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium px-2 py-1 rounded-md transition-colors",
                    pathname.startsWith(item.href) ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent hover:text-primary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}