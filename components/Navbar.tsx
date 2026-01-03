'use client';

import { useState } from 'react';
import { Menu, X, Phone, ChefHat, Utensils, Clock } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <ChefHat size={18} /> },
    { id: 'menu', label: 'Menu', icon: <Utensils size={18} /> },
    { id: 'book', label: 'Book Table', icon: <Clock size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={18} /> }
  ];

  return (
    <nav className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 animate-fade-in">
            <ChefHat size={32} className="animate-bounce-slow" />
            <span className="text-2xl font-bold tracking-tight">Spice Hub</span>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-semibold ${
                  activePage === item.id
                    ? 'bg-white text-red-600 shadow-lg transform scale-105'
                    : 'hover:bg-white/20'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-4 py-3 rounded-lg transition-all font-semibold ${
                  activePage === item.id
                    ? 'bg-white text-red-600'
                    : 'hover:bg-white/20'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}