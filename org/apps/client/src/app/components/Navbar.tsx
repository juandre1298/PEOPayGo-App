'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { navbarOptions } from '../constants/index';
import Button from './Button';
import { FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className=" px-4 flex items-center justify-between max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/logo-2.png" alt="logo" width={200} height={74} />
      </Link>
      <ul className="hidden h-full gap-12 md:flex md:items-center md:justify-between">
        {navbarOptions.map((link) => (
          <Link
            className="capitalize regular-16 text-gray-500 cursor-pointer  tansition-all hover:font-bold"
            href={link.href}
            key={link.key}
          >
            {link.label}
          </Link>
        ))}
        <div className=" md:flex hidden">
          <Button
            type="button"
            title="Login"
            icon={FaUser}
            variant="btn_dark_blue"
            onClick={() => {
              router.push('/login');
            }}
          />
        </div>
      </ul>

      <GiHamburgerMenu className="inline-block cursor-pointer md:hidden w-8 h-8" />
    </nav>
  );
};

export default Navbar;
