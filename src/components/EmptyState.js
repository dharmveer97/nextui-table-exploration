'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function EmptyState({ title, description, isLinkAble }) {
  return (
    <div className="text-center py-10">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="text-2xl mt-2  font-semibold ">{title}</h3>
      <p className="mt-1 text-sm opacity-70">{description}</p>
      <div className="mt-6">
        {isLinkAble && (
          <Link href="/inventory">
            <Button variant="flat" color="primary" type="button">
              Explore More
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
