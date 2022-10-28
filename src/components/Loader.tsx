import React from 'react';

export const Loader = () => {
  return (
    <div
      className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full mx-auto"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only" />
    </div>
  );
};
