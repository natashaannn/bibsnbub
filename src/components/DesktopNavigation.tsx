'use client';
import { SignOutButton } from '@clerk/nextjs';
import { Globe, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const router = useRouter();

  const handleLocaleMenuOpen = () => {
    setLocaleMenuOpen(!localeMenuOpen);
    setMenuOpen(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
    setLocaleMenuOpen(false);
  };

  const handleLocaleChange = (locale: string) => {
    router.push(`/${locale}`);
    setLocaleMenuOpen(false);
  };

  return (
    <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          Bibs&Bub
        </Link>

        {/* Locale Selector */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              onClick={handleLocaleMenuOpen}
            >
              <Globe className="h-5 w-5" />
              <span>{currentLocale.toUpperCase()}</span>
            </button>

            {localeMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                {availableLocales.map(locale => (
                  <button
                    key={locale}
                    type="button"
                    className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                      locale === currentLocale ? 'font-bold' : ''
                    }`}
                    onClick={() => handleLocaleChange(locale)}
                  >
                    {locale.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              onClick={handleMenuOpen}
            >
              <Menu className="h-5 w-5" />
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                {/* Avatar Placeholder */}
                <span className="text-sm font-bold text-gray-700">A</span>
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                {!isLoggedIn
                  ? (
                      <>
                        <Link href="/sign-up" className="block px-4 py-2 text-black-700 hover:bg-gray-100">
                          Sign Up
                        </Link>
                        <Link href="/sign-in" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Log In
                        </Link>
                      </>
                    )
                  : (
                      <>
                        <Link href="/user-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Profile
                        </Link>
                        <SignOutButton>
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Log Out
                          </button>
                        </SignOutButton>
                      </>
                    )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavigation;
