'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { highContrast } = useTheme();

  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-start items-center overflow-x-hidden font-['Space_Grotesk'] transition-colors duration-300 ${
        highContrast
          ? 'bg-black text-white'
          : 'bg-white text-black'
      }`}
    >
      {children}
    </div>
  );
}
