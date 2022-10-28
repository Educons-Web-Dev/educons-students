import Link from 'next/link';
import React from 'react';

interface INavLinkProps {
  linkTo: string;
  children: React.ReactNode;
}

const NavLink = ({ linkTo, children }: INavLinkProps) => {
  return (
    <Link href={linkTo}>
      <a className="border-b-[4px] p-0 pb-[3px] rounded-none cursor-pointer transition-colors border-transparent hover:border-white">
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
