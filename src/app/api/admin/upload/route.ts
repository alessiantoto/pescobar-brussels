import { NextResponse } from 'next/server';
import { getAdminSession } from '@/app/actions/admin-auth';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';

const ALLOWED_TYPES = new Set([
  'image/webp',
  'image/jpeg',
  'image/png',
  'image/avif',
]);
const MAX_BYTES = 6 * 1024 * 1024; // 6 MB
const BUCKET = 'menu-images';

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Neautorizat.' }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Supabase Storage nu este configurat încă.' },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Formular invalid.' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Lipsește fișierul.' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { ok: false, error: 'Format acceptat: WebP, JPEG, PNG sau AVIF.' },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: 'Imaginea depășește 6 MB.' },
      { status: 400 }
    );
  }

  const ext = file.type.split('/')[1]?.replace('jpeg', 'jpg') || 'webp';
  const safeBase = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .slice(0, 48);
  const path = `dishes/${Date.now()}-${safeBase || 'dish'}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: `Upload eșuat (${error.message}). Verifică bucket-ul public "${BUCKET}" în Supabase Storage.`,
      },
      { status: 500 }
    );
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({ ok: true, url: data.publicUrl, path });
}

