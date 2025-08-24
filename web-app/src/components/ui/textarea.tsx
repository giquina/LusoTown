"use client";

import React from 'react';

interface textareaProps {
  className?: string;
  children?: React.ReactNode;
}

export default function textarea({ className, children }: textareaProps) {
  return (
    <div className={`textarea-component ${className || ''}`}>
      {/* TODO: Implement textarea component */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          ⚠️  textarea component stub - needs implementation
        </p>
        {children}
      </div>
    </div>
  );
}

export { textarea };
