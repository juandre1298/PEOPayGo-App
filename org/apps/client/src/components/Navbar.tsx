'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { navbarOptions } from '../app/constants/index';
import Button from './Button';
import { FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { getSession } from '../utils/clientSiteUtils';
import { useEffect, useState } from 'react';

import { logout } from '../service/userService';
import { useGlobalContext } from '../context/store';

const Navbar = () => {
  const { session, setSession } = useGlobalContext();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (!session) {
      const getSessionHandler = async () => {
        const sessionData = await getSession();

        if (sessionData !== null) {
          setIsLogged(true);
          setSession(sessionData);
        } else {
          setIsLogged(false);
          router.push('/login');
        }
      };
      getSessionHandler();
    }
  }, [session, router]);

  useEffect(() => {
    if (session) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [session, setSession, router]);

  const sessionHandler = () => {
    if (isLogged) {
      logout();
      setSession(null);
      setIsLogged(false);
      router.push('/login');
    }
  };

  return (
    <nav className=" px-4 flex items-center justify-between max-container padding-container fixed z-30 py-5 w-full">
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
            title={isLogged ? 'Log out' : 'Log in'}
            icon={FaUser}
            variant="btn_dark_blue"
            onClick={sessionHandler}
          />
        </div>
      </ul>

      <GiHamburgerMenu className="inline-block cursor-pointer md:hidden w-8 h-8" />
    </nav>
  );
};

export default Navbar;
