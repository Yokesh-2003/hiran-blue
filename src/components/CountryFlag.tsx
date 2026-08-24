'use client';

import React, { useState } from 'react';

interface CountryFlagProps {
  code: string;
  name: string;
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  code,
  name,
  className = 'w-5 h-3.5',
}) => {
  const [error, setError] = useState(false);

  const lowerCode = code.toLowerCase();

  if (error) {
    return (
      <span className={`inline-block text-[10px] font-bold uppercase bg-neutral-800 text-neutral-300 rounded px-1 ${className}`}>
        {code}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${lowerCode}.png`}
      srcSet={`https://flagcdn.com/w80/${lowerCode}.png 2x`}
      alt={`${name} flag`}
      className={`inline-block object-cover rounded-[2px] shadow-xs border border-neutral-700/40 shrink-0 ${className}`}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};
