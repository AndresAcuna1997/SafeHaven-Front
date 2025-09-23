'use client';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/pets',
    text: 'Pets',
  },
  {
    href: '/post',
    text: 'Post',
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <NavigationMenu className="flex items-center justify-between px-8 py-3 bg-white/50 backdrop-blur-md border border-gray-200 rounded-full shadow-lg">
        <span className="font-logo pr-2.5 mr-2.5 text-2xl border-r border-r-gray-500">
          SafeHaven
        </span>
        <NavigationMenuList className="flex gap-6">
          {navItems.map((item) => (
            <NavigationMenuLink asChild key={item.href}>
              <Link
                className={`hover:font-semibold px-3 py-1 rounded-md transition-all ${item.href === pathname && 'font-bold'}`}
                href={item.href}
              >
                {item.text}
              </Link>
            </NavigationMenuLink>
          ))}
          {user && (
            <NavigationMenuLink asChild>
              <Link
                className={`hover:font-semibold px-3 py-1 rounded-md transition-all`}
                href="/auth/logout"
              >
                Log out
              </Link>
            </NavigationMenuLink>
          )}

          {!user && (
            <NavigationMenuLink asChild>
              <Link
                className={`hover:font-semibold px-3 py-1 rounded-md transition-all`}
                href="/auth/login"
              >
                Log in
              </Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
export default Navbar;
