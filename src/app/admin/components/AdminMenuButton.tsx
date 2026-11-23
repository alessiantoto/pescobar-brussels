'use client';

import { Menu } from 'lucide-react';
import { useAdminShell } from './AdminShellContext';

export default function AdminMenuButton({
  className = '',
}: {
  className?: string;
}) {
  const { mobileNavOpen, toggleMobileNav } = useAdminShell();

  return (
    <button
      type="button"
      onClick={toggleMobileNav}
      aria-label="Deschide meniul admin"
      aria-expanded={mobileNavOpen}
      className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs transition ${className}`}
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}

