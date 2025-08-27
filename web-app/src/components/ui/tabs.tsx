"use client";

import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = createContext<TabsContextType>({});

interface TabsProps {
  className?: string;
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

export function Tabs({ className, children, value, onValueChange, defaultValue }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || value || '');
  
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const currentValue = value !== undefined ? value : internalValue;

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex border-b border-gray-200 ${className || ''}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ className, children, value }: { className?: string; children: React.ReactNode; value: string }) {
  const { value: currentValue, onValueChange } = useContext(TabsContext);
  const isActive = currentValue === value;

  return (
    <button
      className={`px-4 py-2 border-b-2 transition-colors ${
        isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
      } ${className || ''}`}
      onClick={() => onValueChange?.(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ className, children, value }: { className?: string; children: React.ReactNode; value: string }) {
  const { value: currentValue } = useContext(TabsContext);
  
  if (currentValue !== value) return null;

  return (
    <div className={`mt-4 ${className || ''}`}>
      {children}
    </div>
  );
}
