'use client';

import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'General Project Specification',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-lg bg-[#0d1522] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#1b2a4a] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0a101d] text-white p-6 relative border-b border-[#1b2a4a]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#16233b] hover:bg-[#1b2a4a] flex items-center justify-center text-neutral-300 hover:text-[#d4af37] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-extrabold uppercase tracking-wider mb-2 border border-[#d4af37]/30">
            <Sparkles className="w-3 h-3 text-[#d4af37]" /> Priority Concierge
          </div>
          <h2 className="text-xl font-bold font-display-impact uppercase tracking-tight text-white">
            Direct Studio Inquiry
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Topic: <span className="text-[#d4af37] font-semibold">{initialTopic}</span>
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3 animate-in fade-in">
              <div className="w-14 h-14 bg-[#16233b] text-[#d4af37] border border-[#d4af37]/40 rounded-full flex items-center justify-center mx-auto shadow">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white font-display-impact">
                Inquiry Transmitted Successfully
              </h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Our luxury plumbing consultant will connect via phone and email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-300 uppercase">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Architect / Homeowner Name"
                  className="w-full bg-[#16233b] border border-[#1b2a4a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-300 uppercase">Contact Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#16233b] border border-[#1b2a4a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-300 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@studio.com"
                    className="w-full bg-[#16233b] border border-[#1b2a4a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-300 uppercase">Requirements / Project Scope</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention product models, finishes, or questions..."
                  className="w-full bg-[#16233b] border border-[#1b2a4a] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c8102e] hover:bg-[#a50b24] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow cursor-pointer shadow-red-950/20"
              >
                <Send className="w-4 h-4" />
                <span>Submit Priority Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
