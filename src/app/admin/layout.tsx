import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { getAdminSession } from '@/app/actions/admin-auth';
import { isSupabaseConfigured } from '@/lib/supabase/admin';
import { AdminShellProvider } from './components/AdminShellContext';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Pescobar Brussels · Admin',
  robots: {
    index: false,
    follow: false,
  },
  manifest: '/admin/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Pescobar Admin',
    statusBarStyle: 'black-translucent',
  },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const hdrs = await headers();
  const pathname = hdrs.get('x-pathname') || '';
  const isLoginPage = pathname === '/admin/login';

  const session = await getAdminSession();

  if (!session && !isLoginPage) {
    redirect('/admin/login');
  }

  if (session && isLoginPage) {
    redirect('/admin');
  }

  return (
    <AdminShellProvider
      session={session}
      supabaseConfigured={isSupabaseConfigured()}
    >
      <div
        className="min-h-dvh bg-[#f4f6f8] text-slate-900"
        style={{ colorScheme: 'light' }}
      >
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0B1220',
              color: '#F8FAFC',
              fontSize: '13px',
              borderRadius: '12px',
            },
          }}
        />
      </div>
    </AdminShellProvider>
  );
}

