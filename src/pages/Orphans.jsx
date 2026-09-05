import React, { useState } from 'react';
import { Heart, HandHeart, Filter, Search, ShieldCheck } from 'lucide-react';

export default function Orphans({ onOpenDonateModal }) {
  const [filterGender, setFilterGender] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');

  const orphansList = [
    {
      id: 1,
      name: 'أمين',
      gender: 'male',
      age: 9,
      city: 'صفاقس (ساقية الداعير)',
      urgent: true,
      image: 'https://images.unsplash.com/photo-1637034132655-c500725d908b?w=800&q=80&auto=format&fit=crop',
      story: 'فقد أباه وعمره 5 سنوات، تدرس في الابتدائي وتعيش مع أمها في بيت متهالك.',
      monthlyTarget: 90,
      monthlyCurrent: 63,
      percent: 70
    },
    {
      id: 2,
      name: 'مريم',
      gender: 'female',
      age: 7,
      city: 'صفاقس (ساقية الزيت)',
      urgent: true,
      image: 'https://images.unsplash.com/photo-1595454223600-91fbddbbf4b3?w=800&q=80&auto=format&fit=crop',
      story: 'تلميذة متفوقة في السنة الثانية ابتدائي، تحتاج إلى الكفالة المدرسية والتغذية الصحية.',
      monthlyTarget: 90,
      monthlyCurrent: 45,
      percent: 50
    },
    {
      id: 3,
      name: 'يوسف',
      gender: 'male',
      age: 11,
      city: 'صفاقس (المحرس)',
      urgent: false,
      image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=800&q=80&auto=format&fit=crop',
      story: 'يعيش مع جدته بعد وفاة والديه، حلمه إكمال دراسته والالتحاق بالمعهد الفني.',
      monthlyTarget: 90,
      monthlyCurrent: 81,
      percent: 90
    },
    {
      id: 4,
      name: 'سارة',
      gender: 'female',
      age: 6,
      city: 'صفاقس المدينة',
      urgent: true,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80&auto=format&fit=crop',
      story: 'طفلة صغيرة تحتاج رعاية صحية ودعم غذائي مستمر بعد فاجعة فقدان المعيل الوحيد.',
      monthlyTarget: 90,
      monthlyCurrent: 30,
      percent: 33
    },
    {
      id: 5,
      name: 'خليل',
      gender: 'male',
      age: 13,
      city: 'صفاقس (جبنيانة)',
      urgent: false,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&auto=format&fit=crop',
      story: 'طالب متميز في السنة السابعة أساسي، يحتاج سندا لمواصلة تعليمه وإعالة أخته الصغرى.',
      monthlyTarget: 90,
      monthlyCurrent: 60,
      percent: 67
    },
    {
      id: 6,
      name: 'إيناس',
      gender: 'female',
      age: 10,
      city: 'صفاقس (عقارب)',
      urgent: true,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80&auto=format&fit=crop',
      story: 'تعيش في منطقة ريفية وتحتاج كفالة مدرسية ونقل يومي لتفادي الانقطاع عن التعليم.',
      monthlyTarget: 90,
      monthlyCurrent: 20,
      percent: 22
    }
  ];

  const filteredOrphans = orphansList.filter((o) => {
    if (filterGender !== 'all' && o.gender !== filterGender) return false;
    if (filterUrgency === 'urgent' && !o.urgent) return false;
    return true;
  });

  return (
    <div className="flex-1 space-y-0">
      {/* Banner */}
      <section className="relative -mt-20 pt-44 pb-24 px-4 overflow-hidden bg-primary text-white">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="text-accent font-heading text-sm font-bold tracking-widest uppercase">طفل ينتظر سندا</span>
          <h1 className="font-heading font-extrabold text-4xl lg:text-5xl leading-snug text-shadow-hero">
            كفالة الأيتام بصفاقس
          </h1>
          <p className="text-secondary/90 text-lg leading-loose max-w-2xl mx-auto">
            قال رسول الله ﷺ: « أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا » وَأَشَارَ بِالسَّبَّابَةِ وَالْوُسْطَى.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Controls */}
          <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-primary font-heading font-bold">
              <Filter className="w-5 h-5 text-accent" />
              <span>تصفية الحالات:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Gender Filter */}
              <div className="flex items-center bg-secondary/20 p-1 rounded-full border border-secondary/30">
                <button
                  onClick={() => setFilterGender('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                    filterGender === 'all' ? 'bg-primary text-white shadow-sm' : 'text-primary'
                  }`}
                >
                  الجميع
                </button>
                <button
                  onClick={() => setFilterGender('male')}
                  className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                    filterGender === 'male' ? 'bg-primary text-white shadow-sm' : 'text-primary'
                  }`}
                >
                  ذكور
                </button>
                <button
                  onClick={() => setFilterGender('female')}
                  className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                    filterGender === 'female' ? 'bg-primary text-white shadow-sm' : 'text-primary'
                  }`}
                >
                  إناث
                </button>
              </div>

              {/* Urgency Filter */}
              <button
                onClick={() => setFilterUrgency(filterUrgency === 'urgent' ? 'all' : 'urgent')}
                className={`px-5 py-2 rounded-full text-xs font-heading font-bold transition-all border ${
                  filterUrgency === 'urgent' 
                    ? 'bg-accent text-white border-accent shadow-md' 
                    : 'bg-background text-primary border-border hover:bg-secondary/20'
                }`}
              >
                الحالات العاجلة فقط
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOrphans.map((orphan) => (
              <article 
                key={orphan.id}
                className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img src={orphan.image} alt={orphan.name} className="w-full h-full object-cover" />
                    {orphan.urgent && (
                      <span className="absolute top-4 right-4 bg-accent text-white text-xs font-heading font-bold px-3 py-1 rounded-full shadow-md">
                        حالة عاجلة
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 flex items-center justify-around text-center text-xs border border-border">
                      <div>
                        <span className="font-heading font-bold text-primary text-sm">{orphan.name}</span>
                        <p className="text-muted-foreground text-[10px]">الاسم</p>
                      </div>
                      <div className="w-px h-6 bg-border" />
                      <div>
                        <span className="font-heading font-bold text-primary text-sm">{orphan.age} سنوات</span>
                        <p className="text-muted-foreground text-[10px]">العمر</p>
                      </div>
                      <div className="w-px h-6 bg-border" />
                      <div>
                        <span className="font-heading font-bold text-primary text-sm">{orphan.city}</span>
                        <p className="text-muted-foreground text-[10px]">المنطقة</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {orphan.story}
                    </p>

                    <div className="space-y-2">
                      <div className="h-2.5 rounded-full bg-secondary/40 overflow-hidden">
                        <div 
                          className="h-full progress-gradient rounded-full" 
                          style={{ width: `${orphan.percent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-heading font-bold text-primary">{orphan.monthlyCurrent} د.ت مؤمَّن</span>
                        <span className="text-muted-foreground">الكفالة الكاملة {orphan.monthlyTarget} د.ت/شهرياً</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onOpenDonateModal('كفالة يتيم')}
                    className="w-full flex items-center justify-center gap-2 bg-accent text-white font-heading font-bold py-3.5 rounded-2xl glow-amber hover:bg-accent-hover transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>اكفل {orphan.name} الآن (90 د.ت/ش)</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
