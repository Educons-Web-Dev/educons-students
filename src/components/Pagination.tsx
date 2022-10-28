import React from 'react';

interface IPaginationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  page: number;
  total: number;
  size: number;
}

export const Pagination = ({ onPrevClick, onNextClick, page, size, total }: IPaginationProps) => {
  return (
    <div className="btn-group">
      <button disabled={page === 1} className="btn" onClick={onPrevClick}>
        «
      </button>
      <button className="btn">{page}</button>
      <button disabled={page * size >= total} className="btn" onClick={onNextClick}>
        »
      </button>
    </div>
  );
};
