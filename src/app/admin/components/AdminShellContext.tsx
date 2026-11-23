'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import type { AdminSession } from '@/lib/admin/types';

interface AdminShellContextValue {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  session: AdminSession | null;
  supabaseConfigured: boolean;
}

const AdminShellContext = createContext<AdminShellContextValue | null>(null);

export function AdminShellProvider({
  children,
  session,
  supabaseConfigured,
}: {
  children: ReactNode;
  session: AdminSession | null;
  supabaseConfigured: boolean;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen((prev) => !prev);
  }, []);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      mobileNavOpen,
      setMobileNavOpen,
      toggleMobileNav,
      closeMobileNav,
      session,
      supabaseConfigured,
    }),
    [
      mobileNavOpen,
      toggleMobileNav,
      closeMobileNav,
      session,
      supabaseConfigured,
    ]
  );

  return (
    <AdminShellContext.Provider value={value}>
      {children}
    </AdminShellContext.Provider>
  );
}

export function useAdminShell() {
  const ctx = useContext(AdminShellContext);
  if (!ctx) {
    return {
      mobileNavOpen: false,
      setMobileNavOpen: () => {},
      toggleMobileNav: () => {},
      closeMobileNav: () => {},
      session: null,
      supabaseConfigured: false,
    };
  }
  return ctx;
}

