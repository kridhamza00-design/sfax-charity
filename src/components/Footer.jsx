import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Heart, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1d3b2f] text-[#edf5ee]">
      <div className="max-w-[1280px] mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-[#dfe6be]/20 pt-8">
          <div className="space-y-5">
            <h3 className="font-heading font-bold text-2xl text-white">تواصل معنا</h3>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dfe6be]/40 text-[#dfe6be] hover:bg-[#f59b32] hover:text-[#1d3b2f] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dfe6be]/40 text-[#dfe6be] hover:bg-[#f59b32] hover:text-[#1d3b2f] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dfe6be]/40 text-[#dfe6be] hover:bg-[#f59b32] hover:text-[#1d3b2f] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            <div className="rounded-xl border border-[#dfe6be]/25 bg-[#102d27] px-4 py-3">
              <div className="mb-2 flex items-center gap-2 text-[#dfe6be] text-sm font-bold">
                <Heart className="h-4 w-4" />
                <span>الحساب البنكي الرسمي (RIB):</span>
              </div>
              <p dir="ltr" className="font-mono text-sm text-white">04 027 0123456789 01</p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-heading font-bold text-2xl text-white">روابط سريعة</h3>
            <ul className="space-y-3 text-lg">
              <li><Link to="/about" className="text-[#edf5ee] hover:text-[#dfe6be] transition-colors">عن صفاقس الخيرية</Link></li>
              <li><Link to="/initiatives" className="text-[#edf5ee] hover:text-[#dfe6be] transition-colors">مبادرتنا</Link></li>
              <li><Link to="/campaigns" className="text-[#edf5ee] hover:text-[#dfe6be] transition-colors">حملاتنا</Link></li>
              <li><Link to="/donate" className="text-[#edf5ee] hover:text-[#dfe6be] transition-colors">اختر نوع عطائك</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-bold text-2xl text-white">عن صفاقس الخيرية</h3>
            <p className="text-lg leading-relaxed text-[#edf5ee]">
              جمعية خيرية بصفاقس تعمل على كفالة الأيتام، دعم الأسر المتعففة، وتحقيق أثر مباشر في حياة المواطنين من خلال التعاون والشفافية.
            </p>
            <div className="space-y-3 text-base text-[#edf5ee]">
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#dfe6be]" />
                <span dir="ltr">+216 74 000 000</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#dfe6be]" />
                <span>contact@khairia-sfax.org</span>
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#dfe6be]" />
                <span>شارع الحبيب بورقيبة، صفاقس</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#dfe6be]/15 py-4 text-center text-sm text-[#dfe6be]/90">
        © 2026 جمعية خيرية صفاقس — جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
