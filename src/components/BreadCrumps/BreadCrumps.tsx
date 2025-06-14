'use client';
import { Heading } from '../Typography/Heading';

export const BreadCrumps = ({ currentPath }: { currentPath: string[] }) => {
  return (
    <div className="flex items-center gap-1">
      {currentPath.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <Heading className="py-1.5 px-3 first-letter:uppercase">{item}</Heading>
          {index < currentPath.length - 1 && (
            <div className="w-4 h-4 grid place-content-center text-[rgba(69,69,88,1)] leading-none">
              <svg
                width="4"
                height="4"
                viewBox="0 0 4 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" r="2" fill="#454558" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
