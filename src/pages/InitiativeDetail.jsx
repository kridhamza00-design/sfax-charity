import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowRight, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';
import { initiativesData } from './Initiatives';

export default function InitiativeDetail({ onOpenDonateModal }) {
  const { id } = useParams();
  const initiative = initiativesData.find((item) => item.id === id) || initiativesData[0];

  return (
    <div className="flex-1 space-y-0">
      {/* Banner */}
      <section className="relative -mt-20 pt-44 pb-20 px-4 bg-primary text-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <Link to="/initiatives" className="inline-flex items-center gap-2 text-secondary text-sm font-heading font-bold hover:underline mb-2">
            <ArrowRight className="w-4 h-4" />
            <span>العودة لكل المبادرات</span>
          </Link>
          <span className="block text-accent font-heading text-sm font-bold tracking-widest uppercase">{initiative.category}</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-snug">
            {initiative.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-border">
              <img src={initiative.img} alt={initiative.title} className="w-full h-80 object-cover" />
            </div>

            <div className="space-y-4 bg-card rounded-3xl p-8 border border-border shadow-sm">
              <h2 className="font-heading font-bold text-2xl text-primary">عن المبادرة والأهداف</h2>
              <p className="text-muted-foreground leading-loose text-lg">
                {initiative.desc} تسعى جمعية خيرية صفاقس من خلال هذه المبادرة إلى التغطية الشاملة للفئات المستحقة وضمان استدامة الدعم من خلال مشاركة المتبرعين والمتطوعين بجهة صفاقس.
              </p>

              <div className="pt-4 border-t border-border space-y-3">
                <h3 className="font-heading font-bold text-lg text-primary">أبرز الأهداف والنتائج:</h3>
                <ul className="space-y-2 text-muted-foreground text-base">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span>توفير تغطية جغرافية تشمل كل معتمديات صفاقس</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span>ضمان السرية والكرامة التامة أثناء تسليم المساعدات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span>توثيق وتقارير دورية تسلّم للكافلين والمتبرعين</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-3xl p-6 border border-border shadow-md space-y-6 sticky top-28">
              <div className="bg-secondary/20 p-4 rounded-2xl border border-secondary/40 text-center">
                <span className="text-xs text-muted-foreground font-heading">الأثر المحقق حتى الآن:</span>
                <p className="font-heading font-bold text-xl text-primary mt-1">{initiative.impact}</p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onOpenDonateModal}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-white font-heading font-bold py-4 rounded-full glow-amber shadow-lg text-base"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  <span>ساهم في المبادرة الآن</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>التبرعات مرخّصة ومضمونة الشفافية والوصول.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
