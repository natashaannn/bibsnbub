import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { getTranslations } from 'next-intl/server';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toRadians = (deg: number) => (deg * Math.PI) / 180;

export const calculateDistance = (userLat: number, userLon: number, locLat: number, locLon: number) => {
  const R = 6371; // Earth's radius in KM
  const dLat = toRadians(locLat - userLat);
  const dLon = toRadians(locLon - userLon);
  const lat1 = toRadians(userLat);
  const lat2 = toRadians(locLat);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

export async function fetchTranslations(locale: string) {
  return await getTranslations({ locale, namespace: 'Index' });
}
