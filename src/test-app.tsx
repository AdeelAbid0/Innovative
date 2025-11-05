// Simple test component for debugging build issues
import React from 'react';

export default function TestApp() {
  return (
    <div className="size-full flex items-center justify-center bg-[#212121] text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Ready To Launch</h1>
        <p className="text-lg">Build successful! 🚀</p>
      </div>
    </div>
  );
}