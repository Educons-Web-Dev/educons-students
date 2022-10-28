import { toast, TypeOptions } from 'react-toastify';

export const callToast = (message: string, type: TypeOptions) => {
  toast(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
  });
};
