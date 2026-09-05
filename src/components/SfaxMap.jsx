import React, { useState } from 'react';
import { MapPin, Trophy, Users } from 'lucide-react';

export default function SfaxMap() {
  const [activeDelegation, setActiveDelegation] = useState(null);

  const delegations = [
    { id: 1, name: 'صفاقس المدينة', count: 450, color: '#E98300', cx: 225, cy: 160 },
    { id: 2, name: 'ساقية الداعير', count: 320, color: '#F5B7B1', cx: 185, cy: 125 },
    { id: 3, name: 'ساقية الزيت', count: 280, color: '#AED6F1', cx: 255, cy: 165 },
    { id: 4, name: 'عقارب', count: 210, color: '#F1C40F', cx: 140, cy: 180 },
    { id: 5, name: 'جبنيانة', count: 195, color: '#ABEBC6', cx: 190, cy: 205 },
    { id: 6, name: 'المحرس', count: 180, color: '#FAD7A0', cx: 120, cy: 235 },
    { id: 7, name: 'الصخيرة', count: 160, color: '#F5B7B1', cx: 105, cy: 290 },
    { id: 8, name: 'قرقنة', count: 191, color: '#AED6F1', cx: 295, cy: 115 },
  ];

  const totalCount = delegations.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="text-accent font-heading text-sm tracking-widest inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" /> خريطة الجمعية
          </span>
          <h2 className="mt-3 font-heading font-bold text-3xl lg:text-4xl text-primary">
            كفالة الأيتام في ولاية صفاقس
          </h2>
          <p className="mt-4 text-muted-foreground leading-loose text-lg max-w-2xl mx-auto">
            توزّع الأطفال المكفولين على معتمديات الولاية — أعدادٌ تتحرّك لتغطية كل المناطق المحتاجة.
          </p>
        </div>

        {/* Grid: Map & Delegation Ranking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* SVG Map Section */}
          <div className="lg:col-span-7 bg-card rounded-3xl border border-border p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full relative">
              <svg viewBox="0 0 400 360" className="w-full h-auto drop-shadow-md" role="img" aria-label="خريطة ولاية صفاقس">
                {/* Governorate Outer Boundary Path */}
                <path 
                  d="M 70 70 Q 130 35 210 55 Q 300 65 335 130 Q 355 195 320 250 Q 280 320 195 325 Q 110 320 75 270 Q 40 200 70 70 Z" 
                  fill="#F7F4E8" 
                  stroke="#E98300" 
                  strokeOpacity="0.4" 
                  strokeWidth="2" 
                  strokeDasharray="6 5"
                />

                {/* Delegation Pins */}
                {delegations.map((d) => {
                  const isSelected = activeDelegation === d.id;
                  return (
                    <g 
                      key={d.id} 
                      onClick={() => setActiveDelegation(d.id)}
                      onMouseEnter={() => setActiveDelegation(d.id)}
                      className="cursor-pointer transition-transform duration-300"
                      style={{
                        transformOrigin: `${d.cx}px ${d.cy}px`,
                        transform: isSelected ? 'scale(1.25)' : 'scale(1)'
                      }}
                    >
                      {/* Pulse Circle */}
                      <circle cx={d.cx} cy={d.cy} r="14" fill={d.color} opacity="0.35">
                        <animate attributeName="r" values="10;18;10" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.4s" repeatCount="indefinite" />
                      </circle>

                      {/* Main Pin Dot */}
                      <circle cx={d.cx} cy={d.cy} r="6" fill={d.color} stroke="#FFFFFF" strokeWidth="2" />

                      {/* Number Badge */}
                      <rect x={d.cx - 20} y={d.cy - 34} width="40" height="22" rx="11" fill="#E98300" />
                      <text 
                        x={d.cx} 
                        y={d.cy - 19} 
                        textAnchor="middle" 
                        fontSize="12" 
                        fontWeight="700" 
                        fill="#FFFFFF" 
                        fontFamily="Cairo, sans-serif"
                      >
                        {d.count}
                      </text>

                      {/* Label Text */}
                      <text 
                        x={d.cx} 
                        y={d.cy + 18} 
                        textAnchor="middle" 
                        fontSize="11" 
                        fontWeight={isSelected ? "700" : "500"}
                        fill={isSelected ? "#1B3629" : "#4A4A4A"} 
                        fontFamily="IBM Plex Sans Arabic, sans-serif"
                      >
                        {d.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Delegation Ranking Table */}
          <div className="lg:col-span-5 bg-card rounded-3xl border border-border p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Trophy className="w-5 h-5 text-accent" />
                <h3 className="font-heading font-bold text-lg text-primary">ترتيب المعتمديات</h3>
              </div>

              <div className="space-y-3.5">
                {delegations.map((d, index) => {
                  const percent = Math.round((d.count / 450) * 100);
                  const isSelected = activeDelegation === d.id;

                  return (
                    <div 
                      key={d.id}
                      onClick={() => setActiveDelegation(d.id)}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        isSelected ? 'bg-secondary/30 border border-secondary' : 'hover:bg-secondary/15'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-heading font-bold text-sm text-primary">
                          <span className="text-muted-foreground font-normal ml-1">{index + 1}.</span> 
                          {d.name}
                        </span>
                        <span className="font-heading font-bold text-accent text-sm">
                          {d.count} طفل
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary/25 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ backgroundColor: d.color, width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Total Summary Footer Box */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-primary/90 text-white rounded-2xl px-8 py-4 shadow-lg border border-secondary/30">
            <Users className="w-7 h-7 text-secondary" />
            <div className="text-right">
              <span className="font-heading font-bold text-3xl text-secondary ml-2">{totalCount}</span>
              <span className="text-white/90 font-heading text-base">يتيم مكفول عبر كامل ولاية صفاقس</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
