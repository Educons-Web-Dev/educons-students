import React, { memo } from 'react';

interface ICharactersCountProps {
  charCount: number;
  limit: number;
}

const CharactersCountBase = ({ charCount, limit }: ICharactersCountProps) => {
  return (
    <div className="mb-2 text-gray-400">
      {charCount}/{limit}
    </div>
  );
};

export const CharactersCount = memo(CharactersCountBase);
