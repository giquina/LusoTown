"use client";

import React from 'react';

interface BusinessDirectoryProps {
  className?: string;
  children?: React.ReactNode;
}

export default function BusinessDirectory({ className, children }: BusinessDirectoryProps) {
  return (
    <div className={`businessdirectory-component ${className || ''}`}>
      {/* TODO: Implement BusinessDirectory component */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          ⚠️  BusinessDirectory component stub - needs implementation
        </p>
        {children}
      </div>
    </div>
  );
}

export { BusinessDirectory };
