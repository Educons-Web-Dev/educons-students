import { useSession } from 'next-auth/react';
import Link from 'next/link';
import NavLink from './NavLink';
import { Profile } from './Profile';
export const Navbar = () => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.isAdmin;

  return (
    <div className="navbar bg-[#F60404] md:px-10 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 bg-white shadow-md text-black rounded-box w-52"
          >
            <li>
              <Link href="/news">
                <a className="active:bg-red-600">Novosti</a>
              </Link>
            </li>
            <li>
              <Link href="/students">
                <a className="active:bg-red-600">Studenti</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className="active:bg-red-600">Kontakt</a>
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link href="/admin/users">
                  <a className="active:bg-red-600">Admin</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link href="/">
          <a className="btn btn-ghost px-1 ml-1 normal-case text-base md:text-xl">Educons Students</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal p-0 last:mr-0">
          <li className="mr-6">
            <NavLink linkTo="/news">Novosti</NavLink>
          </li>
          <li className="mr-6 ">
            <NavLink linkTo="/students">Studenti</NavLink>
          </li>
          <li className={`${isAdmin ? 'mr-6' : ''}`}>
            <NavLink linkTo="/contact">Kontakt</NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink linkTo="/admin/users">Admin</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {!session && (
          <Link href="/auth">
            <a className="px-[24px] py-[8px] text-white hover:bg-white hover:text-black rounded-sm transition-colors">
              Prijavi se
            </a>
          </Link>
        )}
        {session && <Profile profileImage={session?.user?.image || ''} />}
      </div>
    </div>
  );
};
