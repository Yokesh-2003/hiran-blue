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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-neutral-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600/20 text-rose-400 text-[10px] font-extrabold uppercase tracking-wider mb-2 border border-rose-600/30">
            <Sparkles className="w-3 h-3" /> Priority Concierge
          </div>
          <h2 className="text-xl font-bold font-display-impact uppercase tracking-tight">
            Direct Studio Inquiry
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Topic: <span className="text-white font-semibold">{initialTopic}</span>
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 font-display-impact">
                Inquiry Transmitted Successfully
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Our luxury plumbing consultant will connect via phone and email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-700 uppercase">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Architect / Homeowner Name"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700 uppercase">Contact Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@studio.com"
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-700 uppercase">Requirements / Project Scope</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention product models, finishes, or questions..."
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c8102e] hover:bg-[#a50b24] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow"
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
