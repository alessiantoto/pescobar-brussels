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
  Sparkles,
  Calendar,
  X,
  CheckCircle2,
  AlertCircle,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { sendAdminMassEmail, type AdminClientItem } from '@/app/actions/admin-clients';
import { PescobarBrandLogo } from '@/components/PescobarBrandLogo';

interface Props {
  initialClients: AdminClientItem[];
}

const TEMPLATES = [
  {
    name: '🦞 Noutăți Meniu & Fructe de Mare',
    subject: 'Noutăți delicioase la Pescobar Seafood Bruxelles! 🦞',
    body: `Dragă oaspete,\n\nVă invităm să descoperiți noile platouri cu fructe de mare proaspete și preparatele de sezon pregătite cu pasiune de echipa Pescobar Bruxelles pe Quai aux Briques 46.\n\nVă așteptăm cu drag alături de cei dragi pentru o experiență culinară mediteraneană autentică!`,
    buttonText: 'Rezervă o masă online',
    buttonUrl: 'https://pescobarseafoodbrussels.be/ro/rezervare',
  },
  {
    name: '✨ Weekend Special & Platouri Regale',
    subject: 'Rezervă-ți masa de weekend la Pescobar Bruxelles 🍷',
    body: `Bună ziua,\n\nWeekendul acesta vă răsfățăm cu sosiri proaspete: homari, creveți regali, caracatiță pe plită și vinuri alese.\n\nLocurile pentru cină sunt limitate, vă recomandăm să vă rezervați masa din timp pentru a vă bucura de o seară memorabilă!`,
    buttonText: 'Vezi meniul & Rezervă',
    buttonUrl: 'https://pescobarseafoodbrussels.be/ro/meniu',
  },
  {
    name: '⭐ Mulțumim pentru vizită!',
    subject: 'Vă mulțumim pentru vizita la Pescobar Bruxelles! ⭐',
    body: `Dragă prieten al restaurantului Pescobar,\n\nA fost o adevărată bucurie să vă avem ca oaspete la Bruxelles!\n\nPărerea dumneavoastră contează enorm pentru noi. Dacă v-a plăcut experiența, ne-ar ajuta foarte mult o recenzie scurtă pe Google.\n\nSă ne revedem cu bine!`,
    buttonText: 'Lasă-ne o recenzie Google',
    buttonUrl: 'https://g.page/r/pescobar-brussels',
  },
];

export default function ClientsClient({ initialClients }: Props) {
  const [clients] = useState<AdminClientItem[]>(initialClients);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'repeat' | 'with_phone'>('all');
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());

  // Email modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [buttonText, setButtonText] = useState('Rezervă o masă');
  const [buttonUrl, setButtonUrl] = useState('https://pescobarseafoodbrussels.be/ro/rezervare');
  const [isSending, setIsSending] = useState(false);

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
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Clienți Unici
            </span>
            <Users className="w-5 h-5 text-[#C8A96A]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{clients.length}</p>
          <p className="mt-1 text-xs text-slate-500">
            Adrese de email colectate din rezervări & mesaje
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Clienți cu Telefon
            </span>
            <Phone className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {clients.filter((c) => Boolean(c.phone)).length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Disponibili pentru confirmări rapide WhatsApp
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Clienți Fideli (2+ Mese)
            </span>
            <Sparkles className="w-5 h-5 text-[#C8A96A]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {clients.filter((c) => c.reservationsCount >= 2).length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Oaspeți fideli care au revenit la Pescobar
          </p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Caută după nume, email sau telefon..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8A96A]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                filterType === 'all'
                  ? 'bg-[#0B192C] text-[#DFC286] border border-[#DFC286]/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Toți ({clients.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('repeat')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                filterType === 'repeat'
                  ? 'bg-[#0B192C] text-[#DFC286] border border-[#DFC286]/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Fideli (2+)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('with_phone')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                filterType === 'with_phone'
                  ? 'bg-[#0B192C] text-[#DFC286] border border-[#DFC286]/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Cu Telefon
            </button>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSelectAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
            >
              {isAllSelected ? (
                <>
                  <CheckSquare className="w-4 h-4 text-[#C8A96A]" />
                  Deselectează toți ({filteredClients.length})
                </>
              ) : (
                <>
                  <Square className="w-4 h-4 text-slate-400" />
                  Selectează toți ({filteredClients.length})
                </>
              )}
            </button>

            {selectedEmails.size > 0 && (
              <span className="text-xs font-bold text-[#0B192C] bg-[#DFC286]/25 border border-[#DFC286]/50 px-2.5 py-1 rounded-lg">
                {selectedEmails.size} selectați
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Exportă CSV
            </button>

            <button
              type="button"
              onClick={() => {
                if (selectedEmails.size === 0) {
                  // If none selected, select all filtered by default
                  setSelectedEmails(new Set(filteredClients.map((c) => c.email)));
                }
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#C8A96A] via-[#DFC286] to-[#C8A96A] hover:brightness-105 text-[#0B192C] text-xs font-extrabold shadow-sm transition"
            >
              <Mail className="w-4 h-4" />
              Trimite Email în Masă ({selectedEmails.size > 0 ? selectedEmails.size : filteredClients.length})
            </button>
          </div>
        </div>
      </div>

      {/* Clients Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        {filteredClients.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Users className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-semibold">Niciun client găsit conform filtrelor.</p>
            <p className="text-xs text-slate-400">
              Clienții se adaugă automat aici pe măsură ce sosesc rezervări sau mesaje de contact.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredClients.map((c) => {
              const isSelected = selectedEmails.has(c.email);
              return (
                <div
                  key={c.email}
                  onClick={() => toggleSelectOne(c.email)}
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition ${
                    isSelected
                      ? 'bg-[#0B192C]/5 border-l-4 border-[#C8A96A]'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      aria-label="Selectează client"
                      className="shrink-0 text-slate-400"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-[#C8A96A]" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 truncate">
                          {c.fullName}
                        </span>
                        {c.reservationsCount >= 2 && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0B192C] text-[#DFC286] border border-[#DFC286]/30">
                            Fidel ({c.reservationsCount} mese)
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
                          <span>Total oaspeți aduși: {c.totalGuests}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmails(new Set([c.email]));
                        setIsModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-[#0B192C]/5 text-xs font-semibold text-slate-700 transition"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C8A96A]" />
                      Email direct
                    </button>
                    {c.phone && (
                      <a
                        href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-800 transition"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Email Composer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-0 animate-in fade-in zoom-in-95 overflow-hidden">
            {/* Luxury Midnight Header */}
            <div className="bg-[#0B192C] px-6 py-5 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <PescobarBrandLogo size="nav" className="!h-8 w-auto shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Campanie Reclamă & Email Marketing
                  </h3>
                  <p className="text-xs text-[#DFC286] mt-0.5 font-medium">
                    {selectedEmails.size} clienți selectați · Trimitere instantă prin Vercel & Resend
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Template Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Alege un model de reclamă rapid (Opțional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.name}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl)}
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#0B192C]/5 hover:border-[#C8A96A] text-left transition"
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
                  Subiect Email Reclamă *
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="ex: Noutăți delicioase de sezon la Pescobar Bruxelles"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#C8A96A]"
                />
              </div>

              {/* Body */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Mesaj Reclamă / Promoție * (Formatare liberă cu paragrafe)
                </label>
                <textarea
                  rows={6}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Scrieți mesajul promoțional sau de mulțumire aici..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#C8A96A] font-sans"
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
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#C8A96A]"
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
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-mono focus:outline-none focus:border-[#C8A96A]"
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
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C8A96A] via-[#DFC286] to-[#C8A96A] hover:brightness-105 disabled:opacity-50 text-[#0B192C] font-extrabold text-sm shadow-md transition"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0B192C] border-t-transparent rounded-full animate-spin" />
                      Se trimite prin Vercel...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Trimite acum la {selectedEmails.size} clienți
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
