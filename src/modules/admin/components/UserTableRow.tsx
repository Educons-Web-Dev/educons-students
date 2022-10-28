import { Admin, User } from '@prisma/client';
import { useAtom } from 'jotai';
import Image from 'next/image';
import React from 'react';
import { adminUserModalAtom, AdminUserModals, selectedUserAdminAtom } from '../atoms';

interface IUserTableRowProps {
  user: User;
  admins: Admin[];
  currentUserEmail: string;
}

export const UserTableRow = ({ user, admins, currentUserEmail }: IUserTableRowProps) => {
  const isAdminUser = admins.some((admin) => admin.email === user.email);
  const isCurrentUser = user.email === currentUserEmail;

  const [_modal, setModal] = useAtom(adminUserModalAtom);
  const [_selectedUser, setSelectedUser] = useAtom(selectedUserAdminAtom);

  const handleClick = (modal: AdminUserModals) => {
    setModal(modal);
    setSelectedUser(user);
  };

  return (
    <tr key={user.id}>
      <td className="lg:max-w-[100px]">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12 relative">
              {user.image && <Image layout="fill" src={user.image} alt={`${user.name} image`} />}
              {!user.image && <i className="fa-solid fa-user"></i>}
            </div>
          </div>
          <div>
            <span>{user.name}</span>
          </div>
        </div>
      </td>
      <td className="lg:max-w-[50px]">
        <span>{user.email}</span>
      </td>
      <td className="lg:max-w-[80px]">
        {isAdminUser && <i className="ml-[13px] fa-solid fa-circle-check text-green-500"></i>}
        {!isAdminUser && <i className="ml-[13px] fa-solid fa-circle-xmark text-red-600"></i>}
      </td>
      <td className="lg:max-w-[40px]">
        {!isCurrentUser && (
          <div>
            {!isAdminUser && (
              <button
                onClick={() => handleClick('promote_user')}
                className="ml-4 text-sm w-8 h-8 rounded-full bg-blue-500 transition-colors hover:bg-blue-600 disabled:bg-gray-600"
              >
                <i className="fa-solid fa-angle-up"></i>
              </button>
            )}
            {isAdminUser && (
              <button
                onClick={() => handleClick('demote_user')}
                className="ml-4 text-sm w-8 h-8 rounded-full bg-blue-500 transition-colors hover:bg-blue-600 disabled:bg-gray-600"
              >
                <i className="fa-solid fa-angle-down"></i>
              </button>
            )}
            <button
              onClick={() => handleClick('delete_user')}
              className="ml-4 text-sm w-8 h-8 rounded-full bg-red-600 transition-colors hover:bg-red-700"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
