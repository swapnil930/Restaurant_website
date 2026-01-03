'use client';

import {PhoneCall } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919999999999"
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 animate-bounce-slow"
      aria-label="Contact us on WhatsApp"
    >
      <PhoneCall size={28} className="animate-ring" />
    </a>
  );
}