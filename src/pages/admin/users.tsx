import { useAtom } from 'jotai';
import debounce from 'lodash.debounce';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Loader, Pagination } from '../../components';
import AdminLayout from '../../layouts/AdminLayout';
import {
  UserTableRow,
  InviteUserModal,
  adminUserModalAtom,
  selectedUserAdminAtom,
  PromoteUserModal,
  DemoteUserModal,
  DeleteUserModal,
} from '../../modules/admin';
import { trpc } from '../../utils/trpc';

const AdminUsersPage = () => {
  const size = 10;
  const { data } = useSession();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useAtom(adminUserModalAtom);
  const [_selectedUser, setSelectedUser] = useAtom(selectedUserAdminAtom);

  const { data: usersData, isLoading } = trpc.useQuery(['user.all', { page, size, search }]);
  const { data: admins } = trpc.useQuery(['user.getAdmins']);

  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const modals = {
    invite_user: <InviteUserModal />,
    promote_user: <PromoteUserModal />,
    demote_user: <DemoteUserModal />,
    delete_user: <DeleteUserModal />,
    '': <></>,
  };

  return (
    <AdminLayout>
      <div className="mt-4 mb-4">
        <ReactModal
          ariaHideApp={false}
          className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-40%]"
          isOpen={modal !== ''}
          shouldCloseOnOverlayClick={true}
          style={{ overlay: { backgroundColor: 'rgba(211, 213, 215, 0.8)' } }}
          onRequestClose={() => {
            setModal('');
            setSelectedUser(null);
          }}
        >
          {modals[modal]}
        </ReactModal>
        <div className="flex justify-center items-center mb-6">
          <button
            onClick={() => setModal('invite_user')}
            className="mr-4 transition-colors py-[12px] px-[22px] rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            <i className="fa-solid fa-plus text-[10px] align-middle mr-2 mb-[1px]"></i>
            Pozovite korisnika
          </button>
          <input
            defaultValue=""
            onChange={(e) => debouncedSearch(e.target.value)}
            type="text"
            placeholder="Pretražite po imenu..."
            className="bg-white border-2 border-black input w-full max-w-xs"
          />
        </div>
        <div className="w-[95%] lg:w-[75%] mx-auto">
          {isLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
          {!isLoading && (
            <table className="table w-full text-white">
              <thead>
                <tr>
                  <th style={{ zIndex: 0 }}>Ime</th>
                  <th>Email adresa</th>
                  <th colSpan={2}>Admin</th>
                </tr>
              </thead>
              <tbody>
                {usersData &&
                  usersData[0]?.map((user) => (
                    <UserTableRow
                      currentUserEmail={data?.user?.email || ''}
                      admins={admins || []}
                      user={user}
                      key={user.id}
                    />
                  ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex justify-center mt-6">
          {usersData && (
            <>
              {size < usersData[1] && (
                <Pagination
                  size={size}
                  total={usersData[1]}
                  page={page}
                  onPrevClick={() => setPage((currPage) => currPage - 1)}
                  onNextClick={() => setPage((currPage) => currPage + 1)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
