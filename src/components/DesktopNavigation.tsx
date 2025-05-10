'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type DesktopNavigationProps = {
  isLoggedIn: boolean;
  currentLocale: string;
  availableLocales: string[];
};

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  availableLocales,
  isLoggedIn,
  currentLocale,
}) => {
  const { user } = useUser();
  const router = useRouter();

  const handleLocaleChange = (locale: string) => {
    router.push(`/${locale}`);
  };

  return (
    <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          Bibs&Bub
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="ml-auto flex items-center gap-4">
          {/* Locale Selector */}
          <NavigationMenuItem className=" list-none">
            <NavigationMenuTrigger className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>{currentLocale.toUpperCase()}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[250px] gap-3 p-4 md:w-[250px] md:grid-cols-2 lg:w-[250px] ">
              {availableLocales.map(locale => (
                <NavigationMenuLink
                  key={locale}
                  onClick={() => handleLocaleChange(locale)}
                >
                  {locale.toUpperCase()}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* User Menu */}
          <NavigationMenuItem className="list-none">
            <NavigationMenuTrigger className="flex items-center gap-2">
              {isLoggedIn
                ? (
                    <>
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user?.imageUrl ?? ''}
                          alt={user?.firstName ?? 'Guest'}
                        />
                        <AvatarFallback className="rounded-lg">?</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.firstName ?? 'Guest'}
                        </span>
                      </div>
                    </>
                  )
                : (
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">G</AvatarFallback>
                      </Avatar>
                      <span className="truncate font-semibold">Guest</span>
                    </div>
                  )}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[250px] gap-3 p-4 md:w-[250px] md:grid-cols-2 lg:w-[250px] ">
              {isLoggedIn
                ? (
                    <>
                      <NavigationMenuLink href="/user-profile">
                        Profile
                      </NavigationMenuLink>
                      <SignOutButton>
                        <NavigationMenuLink>
                          Log Out
                        </NavigationMenuLink>
                      </SignOutButton>
                    </>
                  )
                : (
                    <>
                      <NavigationMenuLink href="/sign-up">
                        Sign Up
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/sign-in">
                        Log In
                      </NavigationMenuLink>
                    </>
                  )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default DesktopNavigation;
