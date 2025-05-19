import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <path d="M12 15V6" />
      <path d="M17 6H7" />
      <path d="M14 9l-2-2-2 2" />
      <rect x="3" y="4" width="18" height="16" rx="2" />
    </svg>
  );
}
