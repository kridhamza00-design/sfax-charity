import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Sprout } from 'lucide-react';

export default function Navbar({ onOpenDonateModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'اختر نوع عطائك', path: '/donate' },
    { name: 'مبادرتنا', path: '/initiatives' },
    { name: 'حملاتنا', path: '/campaigns' },
    { name: 'طفل ينتظر سندا', path: '/orphan' },
    { name: 'عن صفاقس الخيرية', path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-primary/95 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Right side in RTL */}
          <Link className="flex items-center gap-3 group" to="/">
            <span className="flex items-center justify-center w-11 h-11 rounded-full transition-colors bg-secondary/20 text-secondary backdrop-blur-sm group-hover:bg-secondary/30">
              <Sprout className="w-6 h-6" />
            </span>
            <span className="font-heading font-bold text-xl leading-tight text-white text-shadow-hero">
              خيرية صفاقس
            </span>
          </Link>

          {/* Navigation Links - Center in RTL */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-[15px] font-medium transition-all text-shadow-hero ${
                  isActive(link.path)
                    ? 'bg-secondary/40 text-primary font-bold shadow-sm'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Donate Button - Left side in RTL */}
          <button
            type="button"
            onClick={onOpenDonateModal}
            className="hidden lg:inline-flex items-center gap-2 bg-accent text-accent-foreground font-heading font-bold px-6 py-3 rounded-full glow-amber"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>تبرّع الآن</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary/95 backdrop-blur-xl border-t border-white/10 px-4 py-6 space-y-3 animate-in fade-in-0 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-base font-heading font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-secondary/30 text-secondary font-bold'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDonateModal && onOpenDonateModal();
            }}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading font-bold px-6 py-3.5 rounded-full glow-amber text-base"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span>تبرّع الآن</span>
          </button>
        </div>
      )}
    </header>
  );
}
