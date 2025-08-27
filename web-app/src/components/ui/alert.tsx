"use client";

import React from 'react';

interface AlertProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'destructive';
}

export function Alert({ className, children, variant = 'default' }: AlertProps) {
  const variants = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    destructive: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className={`p-4 border rounded-lg ${variants[variant]} ${className || ''}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h4 className={`font-semibold mb-2 ${className || ''}`}>
      {children}
    </h4>
  );
}

export function AlertDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`text-sm ${className || ''}`}>
      {children}
    </div>
  );
}
