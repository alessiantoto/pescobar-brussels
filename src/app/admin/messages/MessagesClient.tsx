'use client';

import { useState, useMemo } from 'react';
import {
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
} from 'lucide-react';
import type { AdminMessageItem } from '@/app/actions/admin-messages';

interface Props {
  initialMessages: AdminMessageItem[];
}

const PAGE_SIZE = 15;

export default function MessagesClient({ initialMessages }: Props) {
  const [messages] = useState<AdminMessageItem[]>(initialMessages);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'private_event' | 'contact'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return messages.filter((m) => {
      if (filterType !== 'all' && m.type !== filterType) return false;
      if (!q) return true;
      return (
        m.firstName.toLowerCase().includes(q) ||
        m.lastName.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q) ||
        (m.company && m.company.toLowerCase().includes(q))
      );
    });
  }, [messages, search, filterType]);

  const privateEventsCount = messages.filter((m) => m.type === 'private_event').length;
  const generalCount = messages.filter((m) => m.type === 'contact').length;

  // Pagination calculation
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedMessages = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const handleFilterChange = (type: 'all' | 'private_event' | 'contact') => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Mesaje Primite
            </span>
            <MessageSquare className="w-5 h-5 text-[#0B1526]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{messages.length}</p>
          <p className="mt-1 text-xs text-slate-500">
            Formular contact & cereri evenimente
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Evenimente Private
            </span>
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{privateEventsCount}</p>
          <p className="mt-1 text-xs text-slate-500">
            Cereri de mese mari, aniversări sau petreceri firmă
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Întrebări Generale
            </span>
            <Mail className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{generalCount}</p>
          <p className="mt-1 text-xs text-slate-500">
            Întrebări despre meniu, parcare, orar
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Caută în mesaje (nume, telefon, companie, subiect)..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-slate-400 placeholder:text-slate-400"
          />
          {search && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
              filterType === 'all'
                ? 'bg-[#0B1526] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Toate ({messages.length})
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('private_event')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
              filterType === 'private_event'
                ? 'bg-[#0B1526] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Evenimente ({privateEventsCount})
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('contact')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
              filterType === 'contact'
                ? 'bg-[#0B1526] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Întrebări ({generalCount})
          </button>

          {(search || filterType !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setFilterType('all');
                setSearch('');
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition shrink-0"
            >
              Resetează
            </button>
          )}
        </div>
      </div>

      {/* Top Pagination & Item Counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs text-slate-500">
        <p>
          {totalItems === 0 ? (
            <span>0 mesaje găsite</span>
          ) : (
            <span>
              Afișare{' '}
              <strong className="text-slate-800">
                {startIndex + 1} - {Math.min(startIndex + PAGE_SIZE, totalItems)}
              </strong>{' '}
              din <strong className="text-slate-800">{totalItems}</strong> mesaje
            </span>
          )}
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Pagina anterioară"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 py-1 text-xs font-bold text-slate-700 bg-slate-100 rounded-md">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Pagina următoare"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">Niciun mesaj găsit.</p>
            <p className="text-xs text-slate-400">
              Când un client trimite o cerere prin site, va apărea instantaneu aici și pe email.
            </p>
          </div>
        ) : (
          paginatedMessages.map((m) => {
            const isEvent = m.type === 'private_event';
            const cleanPhone = m.phone ? m.phone.replace(/[^0-9+]/g, '') : '';

            return (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition space-y-3"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        isEvent
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isEvent ? '🎉 Eveniment Privat' : '✉️ Formular Contact'}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {m.firstName} {m.lastName}
                    </h4>
                    {m.company && (
                      <span className="text-xs text-slate-500 font-medium">
                        · Companie: {m.company}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    {m.createdAt}
                  </span>
                </div>

                {/* Event meta tags if applicable */}
                {isEvent && (
                  <div className="flex items-center gap-3 text-xs bg-slate-50 rounded-xl p-3 border border-slate-200 flex-wrap">
                    {m.eventType && (
                      <span className="font-semibold text-slate-800">
                        Tip: {m.eventType}
                      </span>
                    )}
                    {m.eventDate && (
                      <span className="flex items-center gap-1 text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Data dorită: <strong>{m.eventDate}</strong>
                      </span>
                    )}
                    {m.guestsCount && (
                      <span className="flex items-center gap-1 text-slate-700">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        Nr. persoane: <strong>{m.guestsCount}</strong>
                      </span>
                    )}
                  </div>
                )}

                {/* Subject & Message Body */}
                <div className="space-y-1">
                  {!isEvent && (
                    <p className="text-xs font-bold text-slate-700">
                      Subiect: {m.subject}
                    </p>
                  )}
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                    {m.message || '(Fără mesaj suplimentar)'}
                  </p>
                </div>

                {/* Footer with contact details & action buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    {m.email && (
                      <span className="font-mono text-slate-700">{m.email}</span>
                    )}
                    {m.phone && (
                      <span className="font-semibold text-slate-800">
                        Tel: {m.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
                          `Bună ziua ${m.firstName}, vă contactăm de la Pescobar Seafood Restaurant Bruxelles cu privire la mesajul dumneavoastră.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                    )}

                    {m.phone && (
                      <a
                        href={`tel:${m.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        Sună
                      </a>
                    )}

                    {m.email && (
                      <a
                        href={`mailto:${m.email}?subject=${encodeURIComponent(
                          `Răspuns: ${m.subject || 'Mesaj Pescobar Bruxelles'}`
                        )}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        Email
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Bottom Bar */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          <p className="text-xs text-slate-500">
            Afișare{' '}
            <strong className="text-slate-800">
              {startIndex + 1} - {Math.min(startIndex + PAGE_SIZE, totalItems)}
            </strong>{' '}
            din <strong className="text-slate-800">{totalItems}</strong> mesaje (pagina {safePage} din {totalPages})
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Înapoi
            </button>

            {/* Numeric page pills */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && p - prev > 1;
                  return (
                    <div key={p} className="flex items-center gap-1">
                      {showEllipsis && <span className="text-xs text-slate-400 px-1">…</span>}
                      <button
                        type="button"
                        onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                          safePage === p
                            ? 'bg-[#0B1526] text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {p}
                      </button>
                    </div>
                  );
                })}
            </div>

            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Înainte
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
