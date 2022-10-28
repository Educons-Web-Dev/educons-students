import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IProfileProps {
  profileImage: string;
}

export const Profile = ({ profileImage }: IProfileProps) => {
  return (
    <>
      <div className="dropdown dropdown-end h-[48px]">
        <div className="avatar cursor-pointer">
          <div className="w-12 rounded-full relative">
            <label tabIndex={0} className="m-1 cursor-pointer">
              <Image src={profileImage} layout="fill" objectFit="cover" alt="profile" />
            </label>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-4 dropdown-content text-black border-solid border-black border-[1px] menu p-2 shadow bg-white rounded-box w-52"
        >
          <li>
            <Link href="/profile">
              <a className="hover:bg-red-600 hover:text-white mb-1">Moj profil</a>
            </Link>
          </li>
          <li>
            <a className="hover:bg-red-600 hover:text-white" onClick={() => signOut()}>
              Odjavi se
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
