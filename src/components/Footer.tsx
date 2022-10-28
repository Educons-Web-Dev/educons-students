import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="p-8 bg-neutral text-neutral-content flex justify-center items-center">
      <div>
        <div className="flex mt-1">
          <Link href="https://www.instagram.com/university_educons/?hl=en" target="_blank">
            <a target="_blank">
              <i className="fa-brands fa-instagram text-3xl mr-5 hover:-translate-y-1 transition-transform hover:cursor-pointer"></i>
            </a>
          </Link>

          <Link href="https://sr-rs.facebook.com/EduconsUniverzitet/" target="_blank">
            <a target="_blank">
              <i className="fa-brands fa-facebook text-3xl mr-5 hover:-translate-y-1 transition-transform hover:cursor-pointer"></i>
            </a>
          </Link>
          <Link href="https://www.linkedin.com/company/university-educons" target="_blank">
            <a target="_blank">
              <i className="fa-brands fa-linkedin text-3xl hover:-translate-y-1 transition-transform hover:cursor-pointer"></i>
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};
