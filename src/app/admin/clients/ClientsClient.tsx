'use client';

import { useState, useMemo } from 'react';
import {
  Users,
  Mail,
  Phone,
  Search,
  Download,
  Send,
  CheckSquare,
  Square,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { sendAdminMassEmail, type AdminClientItem } from '@/app/actions/admin-clients';
import { PescobarBrandLogo } from '@/components/PescobarBrandLogo';

interface Props {
  initialClients: AdminClientItem[];
}

const PAGE_SIZE = 20;

const TEMPLATES = [
  {
    name: 'Noutăți Meniu & Recomandarea Chef-ului',
    subject: 'Noutăți gastronomice de sezon la Pescobar Seafood Bruxelles',
    body: `Dragă oaspete,\n\nVă invităm să descoperiți noile selecții de fructe de mare proaspete și preparatele de sezon pregătite cu pasiune de echipa Pescobar Bruxelles pe Quai aux Briques 46.\n\nVă așteptăm cu drag alături de cei dragi pentru o experiență mediteraneană autentică în inima capitalei belgiene!`,
    buttonText: 'Rezervă o masă online',
    buttonUrl: 'https://pescobarseafoodbrussels.be/ro/rezervare',
  },
  {
    name: 'Invitație Degustare & Meniu Special',
    subject: 'Invitație specială: Meniul de weekend la Pescobar Bruxelles',
    body: `Bună ziua,\n\nPentru acest sfârșit de săptămână am pregătit o selecție specială de capturi proaspete: homari, creveți regali, caracatiță pe plită și vinuri mediteraneene alese.\n\nLocurile pentru cină sunt limitate, vă recomandăm să vă rezervați masa din timp pentru o experiență desăvârșită.`,
    buttonText: 'Vezi meniul & Rezervă',
    buttonUrl: 'https://pescobarseafoodbrussels.be/ro/meniu',
  },
  {
    name: 'Mulțumim pentru vizită (Feedback Google)',
    subject: 'Vă mulțumim pentru vizita la Pescobar Seafood Bruxelles',
    body: `Dragă oaspete,\n\nA fost o deosebită plăcere să vă avem alături de noi la Pescobar Seafood Bruxelles.\n\nOpinia dumneavoastră contează mult pentru întreaga noastră echipă. Dacă ați apreciat serviciile și preparatele noastre, ne-ar bucura nespus o scurtă recenzie pe Google.\n\nVă mulțumim și vă așteptăm cu drag să reveniți!`,
    buttonText: 'Lasă o recenzie Google',
    buttonUrl: 'https://g.page/r/pescobar-brussels',
  },
];

export default function ClientsClient({ initialClients }: Props) {
  const [clients] = useState<AdminClientItem[]>(initialClients);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'repeat' | 'with_phone'>('all');
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Email modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [buttonText, setButtonText] = useState('Rezervă o masă');
  const [buttonUrl, setButtonUrl] = useState('https://pescobarseafoodbrussels.be/ro/rezervare');
  const [isSending, setIsSending] = useState(false);

  // Key KPI calculations
  const withPhoneCount = useMemo(
    () => clients.filter((c) => Boolean(c.phone && c.phone.trim().length > 0)).length,
    [clients]
  );
  const repeatCount = useMemo(
    () => clients.filter((c) => c.reservationsCount >= 2).length,
    [clients]
  );

  // Filtered clients
  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase();
    return clients.filter((c) => {
      if (filterType === 'repeat' && c.reservationsCount < 2) return false;
      if (filterType === 'with_phone' && !c.phone) return false;
      if (!q) return true;
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q)
      );
    });
  }, [clients, search, filterType]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedClients = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredClients.slice(start, start + PAGE_SIZE);
  }, [filteredClients, safeCurrentPage]);

  // Handlers resetting page
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (type: 'all' | 'repeat' | 'with_phone') => {
    setFilterType(type);
    setCurrentPage(1);
  };

  // Selection handlers
  const isAllSelected =
    filteredClients.length > 0 &&
    filteredClients.every((c) => selectedEmails.has(c.email));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(filteredClients.map((c) => c.email)));
    }
  };

  const toggleSelectOne = (email: string) => {
    const next = new Set(selectedEmails);
    if (next.has(email)) {
      next.delete(email);
    } else {
      next.add(email);
    }
    setSelectedEmails(next);
  };

  const handleApplyTemplate = (tpl: typeof TEMPLATES[0]) => {
    setEmailSubject(tpl.subject);
    setEmailBody(tpl.body);
    setButtonText(tpl.buttonText);
    setButtonUrl(tpl.buttonUrl);
    toast.success('Model încărcat!');
  };

  // Export CSV
  const handleExportCSV = () => {
    const toExport =
      selectedEmails.size > 0
        ? clients.filter((c) => selectedEmails.has(c.email))
        : filteredClients;

    if (toExport.length === 0) {
      toast.error('Nu există clienți de exportat.');
      return;
    }

    const headers = ['Nume', 'Email', 'Telefon', 'Rezervari', 'Persoane Total', 'Ultima Vizita'];
    const rows = toExport.map((c) => [
      `"${c.fullName.replace(/"/g, '""')}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      `"${c.phone.replace(/"/g, '""')}"`,
      c.reservationsCount,
      c.totalGuests,
      `"${c.lastVisit}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pescobar-clienti-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Au fost exportați ${toExport.length} clienți!`);
  };

  // Send mass email
  const handleSendMassEmail = async () => {
    const recipients = Array.from(selectedEmails);
    if (recipients.length === 0) {
      toast.error('Selectați cel puțin un destinatar.');
      return;
    }
    if (!emailSubject.trim()) {
      toast.error('Introduceți subiectul mesajului.');
      return;
    }
    if (!emailBody.trim()) {
      toast.error('Introduceți conținutul mesajului.');
      return;
    }

    setIsSending(true);
    try {
      const res = await sendAdminMassEmail({
        recipients,
        subject: emailSubject,
        messageBody: emailBody,
        buttonText: buttonText.trim() || undefined,
        buttonUrl: buttonUrl.trim() || undefined,
      });

      if (!res.ok) {
        toast.error(res.error || 'Eroare la trimiterea emailurilor.');
      } else {
        toast.success(`Email trimis cu succes la ${res.sentCount} clienți!`);
        setIsModalOpen(false);
      }
    } catch {
      toast.error('A apărut o problemă la comunicarea cu serverul.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Compact Metric Bar */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-2xs">
        <div className="px-1 sm:px-3 first:pl-0">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
            Total Clienți
          </p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            {clients.length}
          </p>
        </div>
        <div className="px-1 sm:px-3">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
            Cu WhatsApp
          </p>
          <p className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">
            {withPhoneCount}
          </p>
        </div>
        <div className="px-1 sm:px-3 last:pr-0">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
            Recurenți (2+)
          </p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            {repeatCount}
          </p>
        </div>
      </div>

      {/* 2. Filter & Action Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 space-y-3 shadow-2xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {/* Search Input - explicit bg-white and text-slate-900 */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Caută după nume, email sau telefon..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 focus:outline-none focus:border-slate-400 placeholder:text-slate-400 text-sm transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/60 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-1.5 rounded-lg text-xs transition shrink-0 ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 font-medium'
              }`}
            >
              Toți ({clients.length})
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('repeat')}
              className={`px-3 py-1.5 rounded-lg text-xs transition shrink-0 ${
                filterType === 'repeat'
                  ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 font-medium'
              }`}
            >
              Recurenți (2+)
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('with_phone')}
              className={`px-3 py-1.5 rounded-lg text-xs transition shrink-0 ${
                filterType === 'with_phone'
                  ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 font-medium'
              }`}
            >
              Cu Telefon
            </button>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSelectAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
            >
              {isAllSelected ? (
                <>
                  <CheckSquare className="w-4 h-4 text-[#8C6D37]" />
                  <span>Deselectează toți ({filteredClients.length})</span>
                </>
              ) : (
                <>
                  <Square className="w-4 h-4 text-slate-400" />
                  <span>Selectează toți ({filteredClients.length})</span>
                </>
              )}
            </button>

            {selectedEmails.size > 0 && (
              <span className="text-xs font-bold text-[#0B1526] bg-[#DFC286]/20 border border-[#DFC286]/50 px-2.5 py-1 rounded-lg">
                {selectedEmails.size} selectați
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Exportă CSV</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (selectedEmails.size === 0) {
                  setSelectedEmails(new Set(filteredClients.map((c) => c.email)));
                }
                setIsModalOpen(true);
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3.5 py-2 rounded-xl text-xs sm:text-sm shadow-xs flex items-center gap-2 transition"
            >
              <Mail className="w-4 h-4 text-[#DFC286]" />
              <span>
                Trimite Email în Masă ({selectedEmails.size > 0 ? selectedEmails.size : filteredClients.length})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Clients List with Pagination */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs">
        {filteredClients.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Users className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-800">Niciun client găsit conform filtrelor.</p>
            <p className="text-xs text-slate-400">
              Clienții se adaugă automat aici pe măsură ce sosesc rezervări sau mesaje de contact.
            </p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-100">
              {paginatedClients.map((c) => {
                const isSelected = selectedEmails.has(c.email);
                const rawPhone = c.phone ? c.phone.replace(/[^0-9]/g, '') : '';
                return (
                  <div
                    key={c.email}
                    onClick={() => toggleSelectOne(c.email)}
                    className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition ${
                      isSelected
                        ? 'bg-[#0B1526]/5 border-l-4 border-[#8C6D37]'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <button
                        type="button"
                        aria-label="Selectează client"
                        className="mt-0.5 sm:mt-0 shrink-0 text-slate-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectOne(c.email);
                        }}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-[#8C6D37]" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-slate-900 truncate">
                            {c.fullName}
                          </span>
                          {c.reservationsCount >= 2 && (
                            <span className="bg-[#DFC286]/15 text-[#8C6D37] border border-[#DFC286]/40 font-semibold px-2 py-0.5 rounded-md text-[11px]">
                              Oaspete Fidel ({c.reservationsCount} vizite)
                            </span>
                          )}
                          <span className="text-xs text-slate-500 font-mono">
                            {c.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                          {c.phone && (
                            <span className="flex items-center gap-1 font-medium text-slate-700">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {c.phone}
                            </span>
                          )}
                          {c.lastVisit && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              Ultima vizită: {c.lastVisit}
                            </span>
                          )}
                          {c.totalGuests > 0 && (
                            <span className="text-slate-500">
                              Total oaspeți: {c.totalGuests}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Direct Contact Links */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <a
                        href={`mailto:${c.email}`}
                        onClick={(e) => e.stopPropagation()}
                        title={`Trimite email la ${c.email}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>Email</span>
                      </a>

                      {rawPhone && (
                        <a
                          href={`https://wa.me/${rawPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={`Deschide WhatsApp pentru ${c.phone}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmails(new Set([c.email]));
                          setIsModalOpen(true);
                        }}
                        title="Compune campanie dedicată"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition"
                      >
                        <Send className="w-3 h-3 text-[#8C6D37]" />
                        <span className="hidden sm:inline">Campanie</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Smart Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/60">
                <div className="text-xs text-slate-600">
                  Afișare{' '}
                  <span className="font-semibold text-slate-900">
                    {(safeCurrentPage - 1) * PAGE_SIZE + 1}
                  </span>{' '}
                  -{' '}
                  <span className="font-semibold text-slate-900">
                    {Math.min(safeCurrentPage * PAGE_SIZE, filteredClients.length)}
                  </span>{' '}
                  din{' '}
                  <span className="font-semibold text-slate-900">
                    {filteredClients.length}
                  </span>{' '}
                  clienți
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={safeCurrentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition"
                    title="Pagina anterioară"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Always show first, last, and pages around current page
                        if (totalPages <= 7) return true;
                        if (page === 1 || page === totalPages) return true;
                        if (Math.abs(page - safeCurrentPage) <= 1) return true;
                        return false;
                      })
                      .map((page, index, array) => {
                        const prev = array[index - 1];
                        const showEllipsis = prev && page - prev > 1;
                        return (
                          <div key={page} className="flex items-center gap-1">
                            {showEllipsis && (
                              <span className="px-1 text-slate-400 text-xs">...</span>
                            )}
                            <button
                              type="button"
                              onClick={() => setCurrentPage(page)}
                              className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold transition ${
                                page === safeCurrentPage
                                  ? 'bg-[#0B1526] text-white shadow-2xs'
                                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {page}
                            </button>
                          </div>
                        );
                      })}
                  </div>

                  <button
                    type="button"
                    disabled={safeCurrentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition"
                    title="Pagina următoare"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. Email Composer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-0 animate-in fade-in zoom-in-95 overflow-hidden">
            {/* Elegant Midnight Header */}
            <div className="bg-[#0B1526] px-6 py-4 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <PescobarBrandLogo size="nav" className="!h-7 w-auto shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    Campanie Email Marketing
                  </h3>
                  <p className="text-xs text-[#DFC286] mt-0.5 font-medium">
                    {selectedEmails.size} clienți selectați · Trimitere securizată prin Resend
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Template Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Alege un model de comunicare (Opțional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.name}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl)}
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-300 text-left transition"
                    >
                      <p className="text-xs font-bold text-slate-900 truncate">{tpl.name}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{tpl.subject}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Subiect Email *
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="ex: Noutăți gastronomice de sezon la Pescobar Bruxelles"
                  className="w-full px-3.5 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-slate-400 placeholder:text-slate-400"
                />
              </div>

              {/* Body */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Mesaj Email * (Formatare liberă cu paragrafe)
                </label>
                <textarea
                  rows={6}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Scrieți mesajul pentru oaspeți aici..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-800 border border-slate-200 text-sm focus:outline-none focus:border-slate-400 placeholder:text-slate-400 font-sans"
                />
              </div>

              {/* CTA Button config */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">
                    Text Buton Acțiune (Opțional)
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="ex: Rezervă o masă acum"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-900 focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">
                    Link Buton Acțiune
                  </label>
                  <input
                    type="text"
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    placeholder="https://pescobarseafoodbrussels.be/ro/rezervare"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-900 font-mono focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Anulează
                </button>

                <button
                  type="button"
                  disabled={isSending || selectedEmails.size === 0}
                  onClick={handleSendMassEmail}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1526] hover:bg-[#132A4A] disabled:opacity-50 text-white font-semibold text-xs sm:text-sm border border-white/10 shadow-sm transition"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Se trimite prin Resend...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#DFC286]" />
                      Trimite la {selectedEmails.size} clienți
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
