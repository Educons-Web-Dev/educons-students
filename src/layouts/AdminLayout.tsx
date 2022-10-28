import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IAdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: IAdminLayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === 'loading';

  useEffect(() => {
    if (!loading) {
      if (!session?.user?.isAdmin) {
        router.back();
      }
    }
  }, [loading]);

  return (
    <>
      {children}
      <div className="btm-nav">
        <Link href="/admin">
          <a className="hover:bg-blue-600 text-white transition-colors disabled">
            <i className="fa-solid fa-chart-simple"></i>
            <span className="btm-nav-label">Statistika</span>
          </a>
        </Link>
        <Link href="/admin/users">
          <a className="hover:bg-blue-600 text-white transition-colors">
            <i className="fa-solid fa-user"></i>
            <span className="btm-nav-label">Korisnici</span>
          </a>
        </Link>
        <Link href="/admin/news">
          <a className="hover:bg-blue-600 text-white transition-colors">
            <i className="fa-solid fa-newspaper"></i>
            <span className="btm-nav-label">Novosti</span>
          </a>
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
