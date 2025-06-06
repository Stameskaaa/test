import React from 'react';

export const Badge = ({ children }: { children: string }) => {
  return (
    <div className="py-1 px-2 gap-2.5 flex rounded-[12px] bg-[rgba(219,249,255,1)] text-[rgba(0,152,179,1)] text-base leading-6 text-center">
      {children}
    </div>
  );
};
