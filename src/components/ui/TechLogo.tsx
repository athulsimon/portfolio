import React from 'react';

// Map of brand names to their SVG file or path
export const BRAND_MAP: Record<string, { file: string; color: string }> = {
  Dart: { file: '/logos/dart.svg', color: '#0175C2' },
  Flutter: { file: '/logos/flutter.svg', color: '#02569B' },
  'Bloc State Management': { file: '/logos/bloc.svg', color: '#0052CC' },
  Android: { file: '/logos/android.svg', color: '#3DDC84' },
  iOS: { file: '/logos/apple.svg', color: '#000000' },
  'Web Apps': { file: '/logos/apple.svg', color: '#E34F26' },
  Firebase: { file: '/logos/firebase.svg', color: '#FFCA28' },
  Appwrite: { file: '/logos/appwrite.svg', color: '#FD366E' },
  MySQL: { file: '/logos/mysql.svg', color: '#4479A1' },
  'Sqflite CRUD': { file: '/logos/sqlite.svg', color: '#003B57' },
  'Git & Version Control': { file: '/logos/git.svg', color: '#F05032' },
  'ChatGPT API & AI': { file: '/logos/openai.svg', color: '#10A37F' },
};

export const CONCEPT_MAP: Record<string, { file: string; color: string }> = {
  SharedPreference: { file: '/logos/storage.svg', color: '#555555' },
  'Unit & Widget Testing': { file: '/logos/testing.svg', color: '#2E7D32' },
  'Publishing (Playstore & Appstore)': { file: '/logos/publish.svg', color: '#0288D1' },
  Localisation: { file: '/logos/locale.svg', color: '#7B1FA2' },
};

export function isBrand(name: string): boolean {
  return name in BRAND_MAP;
}

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

export const TechLogo: React.FC<TechLogoProps> = ({
  name,
  size = 24,
  className = '',
  glow = false,
}) => {
  const brand = BRAND_MAP[name];
  const concept = CONCEPT_MAP[name];
  const item = brand || concept;

  const file = item ? item.file : '/logos/flutter.svg';
  const color = item ? item.color : '#0d0d0d';

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-300 opacity-25"
          style={{ backgroundColor: color }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={file}
        alt={`${name} icon`}
        width={size}
        height={size}
        className="object-contain relative z-10 select-none"
        loading="lazy"
      />
    </div>
  );
};
