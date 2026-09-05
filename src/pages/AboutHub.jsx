import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info, HeartHandshake, ArrowLeft } from 'lucide-react';

export default function AboutHub() {
  return (
    <div className="flex-1 space-y-0">
      {/* Banner */}
      <section className="relative -mt-20 pt-44 pb-24 px-4 overflow-hidden bg-primary text-white">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <span className="text-accent font-heading text-sm font-bold tracking-widest uppercase">من نحن</span>
          <h1 className="font-heading font-extrabold text-4xl lg:text-5xl leading-snug text-shadow-hero">
            عن صفاقس الخيرية
          </h1>
          <p className="text-secondary/90 text-lg leading-loose">
            تعرّف على جمعيتنا: شفافيتها المالية، تاريخها، رؤيتها، وهيكلها التسييري.
          </p>
        </div>
      </section>

      {/* Sections Cards */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Transparency */}
          <Link 
            to="/about/transparency" 
            className="group bg-card rounded-3xl border border-border overflow-hidden hover:border-accent hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop" 
                alt="الشفافية المالية" 
                className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-7 space-y-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary/30 text-primary mb-2">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                </span>
                <h2 className="font-heading font-bold text-2xl text-primary group-hover:text-accent transition-colors">
                  الشفافية المالية
                </h2>
                <p className="text-muted-foreground leading-loose text-sm">
                  تقارير، حسابات، مالية وإحصائيات — لنبقى مأموني الأمانة على عطائكم.
                </p>
              </div>
            </div>
            <div className="p-7 pt-0">
              <span className="inline-flex items-center gap-2 text-accent font-heading font-bold text-sm group-hover:gap-3 transition-all">
                <span>اطّلع التفاصيل</span>
                <ArrowLeft className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Card 2: Association */}
          <Link 
            to="/about/association" 
            className="group bg-card rounded-3xl border border-border overflow-hidden hover:border-accent hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80&auto=format&fit=crop" 
                alt="معلومات عن الجمعية" 
                className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-7 space-y-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary/30 text-primary mb-2">
                  <Info className="w-6 h-6 text-accent" />
                </span>
                <h2 className="font-heading font-bold text-2xl text-primary group-hover:text-accent transition-colors">
                  معلومات عن الجمعية
                </h2>
                <p className="text-muted-foreground leading-loose text-sm">
                  من نحن، تاريخنا، رؤيتنا، أهدافنا، هيكلنا التسييري وشركاؤنا ومتطوّعونا.
                </p>
              </div>
            </div>
            <div className="p-7 pt-0">
              <span className="inline-flex items-center gap-2 text-accent font-heading font-bold text-sm group-hover:gap-3 transition-all">
                <span>اطّلع التفاصيل</span>
                <ArrowLeft className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Card 3: Cases */}
          <Link 
            to="/about/cases" 
            className="group bg-card rounded-3xl border border-border overflow-hidden hover:border-accent hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <img 
                src="https://images.unsplash.com/photo-1637034132655-c500725d908b?w=800&q=80&auto=format&fit=crop" 
                alt="دراسة الحالات" 
                className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-7 space-y-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary/30 text-primary mb-2">
                  <HeartHandshake className="w-6 h-6 text-accent" />
                </span>
                <h2 className="font-heading font-bold text-2xl text-primary group-hover:text-accent transition-colors">
                  دراسة الحالات
                </h2>
                <p className="text-muted-foreground leading-loose text-sm">
                  خدماتنا والحالات والمشاريع التي تنتظر عطاءك في كل خدمة بالولاية.
                </p>
              </div>
            </div>
            <div className="p-7 pt-0">
              <span className="inline-flex items-center gap-2 text-accent font-heading font-bold text-sm group-hover:gap-3 transition-all">
                <span>اطّلع التفاصيل</span>
                <ArrowLeft className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
