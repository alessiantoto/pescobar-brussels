'use client';

import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { Plus, Trash2, Upload, Video } from 'lucide-react';
import toast from 'react-hot-toast';
import type { MenuItemRow } from '@/lib/menu-contract';

export default function MediaTab({
  item,
  onChange,
}: {
  item: MenuItemRow;
  onChange: Dispatch<SetStateAction<MenuItemRow>>;
}) {
  const [uploading, setUploading] = useState(false);
  const [galleryInput, setGalleryInput] = useState('');

  const handleUploadMain = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = (await res.json()) as {
        ok: boolean;
        url?: string;
        error?: string;
      };
      if (!data.ok || !data.url) {
        toast.error(data.error || 'Upload eșuat.');
        return;
      }
      onChange((prev) => ({ ...prev, image: data.url ?? null }));
      toast.success('Imagine încărcată!');
    } catch {
      toast.error('Eroare rețea la upload.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const addGalleryImage = () => {
    const clean = galleryInput.trim();
    if (!clean) return;
    onChange((prev) => ({
      ...prev,
      gallery: [...prev.gallery, clean],
    }));
    setGalleryInput('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Main image */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Imagine principală
          </h2>
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold cursor-pointer hover:bg-slate-800">
            <Upload className="w-3.5 h-3.5" />
            {uploading ? 'Se încarcă...' : 'Upload imagine'}
            <input
              type="file"
              accept="image/webp,image/jpeg,image/png,image/avif"
              onChange={handleUploadMain}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        <input
          type="text"
          value={item.image ?? ''}
          onChange={(e) =>
            onChange((prev) => ({
              ...prev,
              image: e.target.value || null,
            }))
          }
          placeholder="/images/menu/2864071055794134144.webp sau URL Supabase"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-xs"
        />

        <div className="aspect-[4/3] rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={item.names.fr}
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-xs text-slate-400">Preview indisponibil</p>
          )}
        </div>
      </div>

      {/* Gallery & 9:16 Video Clip */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">
            Galerie suplimentară
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              placeholder="URL imagine secundară..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
            <button
              type="button"
              onClick={addGalleryImage}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Adaugă
            </button>
          </div>

          {item.gallery.length > 0 && (
            <div className="space-y-2">
              {item.gallery.map((url, idx) => (
                <div
                  key={`${url}-${idx}`}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <span className="truncate font-mono">{url}</span>
                  <button
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        gallery: prev.gallery.filter((_, i) => i !== idx),
                      }))
                    }
                    className="text-rose-600 hover:bg-rose-50 p-1 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Video className="w-4 h-4 text-amber-600" />
            Clip scurt 9:16 (TikTok / Reels / MP4)
          </h2>
          <input
            type="text"
            value={item.clip_url ?? ''}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                clip_url: e.target.value || null,
              }))
            }
            placeholder="https://... sau /videos/video_carousel_1.mp4"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
          />
        </div>
      </div>
    </div>
  );
}

