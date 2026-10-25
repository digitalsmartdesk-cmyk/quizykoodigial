'use client';
import { useEffect, useState } from 'react';

export function useViewport(): number {
  const [vw, setVw] = useState(1280);
  useEffect(() => {
    const on = () => setVw(window.innerWidth);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return vw;
}
