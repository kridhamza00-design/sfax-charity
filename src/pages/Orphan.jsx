import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Sparkles, Star, ChevronRight, ChevronLeft, AlertCircle, 
  Activity, Stethoscope, Trophy, Users, Calendar, MapPin, GraduationCap, 
  Award, Quote, ChevronDown, CheckCircle2, ArrowLeft, Clock
} from 'lucide-react';

export default function Orphan({ onOpenDonateModal }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [orphanIndex, setOrphanIndex] = useState(0);
  const [medicalIndex, setMedicalIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 1. Waiting orphans
  const waitingOrphans = [
    {
      id: 'amin',
      name: 'أمين',
      age: '9 سنة',
      city: 'صفاقس (ساقية الداعير)',
      dream: 'معلّم',
      hobby: 'كرة القدم',
      desc: 'كفالة شهرية للدراسة والغذاء بعد فقد والده المعيل.',
      img: 'https://images.unsplash.com/photo-1637034132655-c500725d908b?w=800&q=80&auto=format&fit=crop'
    },
    {
      id: 'mariem',
      name: 'مريم',
      age: '7 سنة',
      city: 'صفاقس (ساقية الزيت)',
      dream: 'طبيبة',
      hobby: 'الرسم',
      desc: 'كفالة ورعاية ليتيمة الأبوين تسكن مع جدّتها.',
      img: 'https://images.unsplash.com/photo-1497655392221-e645087843da?w=800&q=80&auto=format&fit=crop'
    },
    {
      id: 'youssef',
      name: 'يوسف',
      age: '11 سنة',
      city: 'صفاقس (المحرس)',
      dream: 'طبيب',
      hobby: 'القراءة',
      desc: 'دعم مدرسي وكفالة شهرية يحلم أن يصبح طبيباً.',
      img: 'https://images.unsplash.com/photo-1550290129-443a64c3ff25?w=800&q=80&auto=format&fit=crop'
    },
    {
      id: 'nour',
      name: 'نور',
      age: '10 سنة',
      city: 'صفاقس المدينة',
      dream: 'مهندسة',
      hobby: 'الموسيقى',
      desc: 'كفالة شهرية بعد فقد والدها، تعيلها أمّه بصعوبة.',
      img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80&auto=format&fit=crop'
    },
    {
      id: 'alaa',
      name: 'آلاء',
      age: '8 سنة',
      city: 'صفاقس (جبنيانة)',
      dream: 'معلمة',
      hobby: 'الشطرنج',
      desc: 'كفالة شهرية لتكفل دراستها بعد فقد عائلها.',
      img: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80&auto=format&fit=crop'
    },
    {
      id: 'baraa',
      name: 'براء',
      age: '6 سنة',
      city: 'صفاقس (عقارب)',
      dream: 'شرطي',
      hobby: 'الدراجات',
      desc: 'كفالة شهرية ودعم مدرسي لطفل يتيم.',
      img: 'https://images.unsplash.com/photo-1531579797967-8a246a9395a9?w=800&q=80&auto=format&fit=crop'
    },
    {
      id: 'jana',
      name: 'جنى',
      age: '5 سنة',
      city: 'صفاقس (الصخيرة)',
      dream: 'ممرّضة',
      hobby: 'اللعب بالعُرى',
      desc: 'كفالة شهرية تغطي قوتها ورعايتها بعد يتْمها.',
      img: 'https://images.unsplash.com/photo-1621403215688-d4d8088ccbc4?w=800&q=80&auto=format&fit=crop'
    }
  ];

  // 2. Urgent medical cases
  const medicalCases = [
    {
      id: 'seif',
      name: 'سيف',
      age: '6 سنة',
      city: 'صفاقس المدينة',
      dream: 'لاعب كرة',
      hobby: 'الرياضة',
      condition: 'علّة قلب ولادية',
      desc: 'يحتاج عملية قلب عاجلة ومساهمة في تكاليفها.',
      img: 'https://images.unsplash.com/photo-1531579797967-8a246a9395a9?w=800&q=80&auto=format&fit=crop'
    },
    {
      id: 'lina',
      name: 'لينة',
      age: '5 سنة',
      city: 'صفاقس (ساقية الزيت)',
      dream: 'طبيبة أطفال',
      hobby: 'القصة',
      condition: 'ربو مزمن',
      desc: 'علاج مزمن شهري لأدوية لا يقوى أهلها على ثمنها.',
      img: 'https://images.unsplash.com/photo-1621403215688-d4d8088ccbc4?w=800&q=80&auto=format&fit=crop'
    },
    {
      id: 'adam',
      name: 'آدم',
      age: '8 سنة',
      city: 'صفاقس (المحرس)',
      dream: 'مبرمج',
      hobby: 'الحاسوب',
      condition: 'إصابة عمود فقري',
      desc: 'يحتاج تجهيزات طبية ومتابعة دورية بعد حادث.',
      img: 'https://images.unsplash.com/photo-1637034132655-c500725d908b?w=800&q=80&auto=format&fit=crop'
    },
    {
      id: 'houda',
      name: 'هدى',
      age: '4 سنة',
      city: 'صفاقس (ساقية الداعير)',
      dream: 'رسّامة',
      hobby: 'الرسم',
      condition: 'ضعف سمع ولادي',
      desc: 'تحتاج سماعة طبية عالية الدقة لمواصلة النطق.',
      img: 'https://images.unsplash.com/photo-1497655392221-e645087843da?w=800&q=80&auto=format&fit=crop'
    }
  ];

  // Pass rate stats (موسم 2024-2025: من إجتاز عامه الدراسي)
  const passStats = [
    { level: 'الابتدائي', percent: 96, detail: 'أكثر من 850 طفل' },
    { level: 'الإعدادي', percent: 91, detail: 'أكثر من 420 طفل' },
    { level: 'الثانوي', percent: 89, detail: 'أكثر من 310 طفل' },
    { level: 'البكالوريا', percent: 94, detail: 'أكثر من 180 طفل' },
    { level: 'الجامعي', percent: 97, detail: 'أكثر من 100 شاب' }
  ];

  // Honor roll (أبناؤنا المكفولون المتفوقون 2024-2025)
  const topScores = [
    { level: 'البكالوريا', score: '18.85', name: 'أمين م.' },
    { level: 'الجامعي', score: '18.12', name: 'يوسف ك.' },
    { level: 'الثانوي', score: '17.75', name: 'نور ع.' },
    { level: 'الإعدادي', score: '16.73', name: 'آلاء ر.' },
    { level: 'الابتدائي', score: '15.62', name: 'براء س.' }
  ];

  // Testimonials (شهادات من عاينوا الأثر)
  const testimonials = [
    {
      quote: 'منذ سنتين أكفل طفلاً عبر الجمعية وأشعر كل شهر أنني أساهم بفرْحة تلمس قلب يوسف…',
      author: 'د. سامي عبد الله',
      role: 'كافل متميز'
    },
    {
      quote: 'كفالة الأيتام ليست مجرد دعم مالي، بل هي حماية للأمل ورعايتهم حتى النجاح الكامل.',
      author: 'الأستاذة منيرة',
      role: 'أخصائية اجتماعية'
    }
  ];

  // Success Stories (حكاياتٌ تُروى… وأثرٌ لا يُنسى)
  const impactStories = [
    {
      title: 'سيف وأمّه انتصرا',
      desc: 'بعد فقد والده، واجهت عائلته ظروفاً صحية ودراسية قاسية. بكفالتكم واستمرار المتابعة تخرّج بتفوق ومارس عمله ليصبح سنداً لأمه وإخوته.',
      badge: 'قصة نجاح وتفوق بعد كفالة دامت 6 سنوات',
      img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80&auto=format&fit=crop'
    },
    {
      title: 'الأب وأطفاله الأربعة',
      desc: 'تعرّضت العائلة لأزمة بعد وفاة المعيل الوحيد. تكفّلت الجمعية بكل متطلبات الأطفال الدراسية والغذائية حتى التحق أكبرهم بالجامعة.',
      badge: 'كفالة كاملة شملت الرعاية الصحية والتعليمية',
      img: 'https://images.unsplash.com/photo-1497655392221-e645087843da?w=800&q=80&auto=format&fit=crop'
    }
  ];

  // Gallery (فعاليات وأيام مرت بأثرها)
  const galleryImages = [
    { title: 'يوم اليتيم بصفاقس', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80&auto=format&fit=crop' },
    { title: 'توزيع الحقائب المدرسية', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&auto=format&fit=crop' },
    { title: 'الحفل السنوي للمتفوقين', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80&auto=format&fit=crop' },
    { title: 'رحلة الأيتام الترفيهية', img: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=600&q=80&auto=format&fit=crop' },
    { title: 'التكريم والجوائز', img: 'https://images.unsplash.com/photo-1531579797967-8a246a9395a9?w=600&q=80&auto=format&fit=crop' }
  ];

  // FAQs
  const faqs = [
    {
      q: 'كم تبلغ تكلفة الكفالة الشهرية لليتيم؟',
      a: 'تبلغ الكفالة الشهرية 90 ديناراً تونسياً، وتغطي المستلزمات المدرسية والتغذية والرعاية الصحية والدعم الاجتماعي الدوري.'
    },
    {
      q: 'هل يمكنني التواصل مع الطفل المكفول؟',
      a: 'تصلك تقارير دورية وفصلية عن نتائج الطفل الدراسية ووضعه الصحي مع ضمان الخصوصية والكرامة التامة وفق الضوابط القانونية.'
    },
    {
      q: 'هل يمكن المشاركة في كفالة جزئية؟',
      a: 'نعم بالتأكيد، يمكنك التبرع بأي مبلغ (20 د.ت، 50 د.ت...) ليشارك مع كافلين آخرين في تأمين كامل المبلغ الشهري لليتيم.'
    }
  ];

  const nextOrphan = () => setOrphanIndex((prev) => (prev + 1) % Math.ceil(waitingOrphans.length / 3));
  const prevOrphan = () => setOrphanIndex((prev) => (prev - 1 + Math.ceil(waitingOrphans.length / 3)) % Math.ceil(waitingOrphans.length / 3));

  const nextMedical = () => setMedicalIndex((prev) => (prev + 1) % Math.ceil(medicalCases.length / 3));
  const prevMedical = () => setMedicalIndex((prev) => (prev - 1 + Math.ceil(medicalCases.length / 3)) % Math.ceil(medicalCases.length / 3));

  return (
    <div className="flex-1 bg-background">
      {/* 1. Hero */}
      <section className="relative -mt-20 pt-44 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1200&q=80&auto=format&fit=crop" 
            alt="طفل ينتظر سندا" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/85"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <span className="text-accent font-heading text-sm tracking-widest font-bold">كفالة الأيتام</span>
          <h1 className="mt-3 font-heading font-bold text-4xl lg:text-5xl leading-snug text-shadow-hero">
            طفل ينتظر سندا
          </h1>
          <p className="mt-6 text-secondary/90 text-lg leading-loose font-heading">
            « أنا وکافل الیتیم فی الجنة هکذا » — متفق عليه.
          </p>
        </div>
      </section>

      {/* 2. Children Awaiting Sponsors Carousel */}
      <section className="py-20 px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-heading text-sm tracking-widest font-bold">بانتظار كفيل</span>
          <h2 className="mt-3 font-heading font-bold text-3xl lg:text-4xl text-primary leading-snug">أطفال ينتظرون كفيلاً</h2>
          <p className="mt-4 text-muted-foreground leading-loose text-lg max-w-2xl mx-auto">
            تنقّل بين الحالات واختر طفلاً تكفله شهرياً ليرعى دراسته وقوته وكرامته.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {waitingOrphans.slice(orphanIndex * 3, orphanIndex * 3 + 3).map((item) => (
              <div key={item.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="relative">
                    <img src={item.img} alt={item.name} className="w-full aspect-[4/3] object-cover" />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-heading font-bold px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
                      <Heart className="w-3.5 h-3.5 fill-current" /> بانتظار كفيل
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-lg text-primary">{item.name}</h3>
                      <span className="text-sm text-muted-foreground">{item.age}</span>
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm">{item.city}</p>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-muted-foreground">يحلم أن يصبح:</span>
                        <span className="font-heading font-bold text-primary">{item.dream}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-muted-foreground">شغفه:</span>
                        <span className="font-heading font-bold text-primary">{item.hobby}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-foreground leading-loose text-sm flex items-start gap-2 flex-1">{item.desc}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button 
                    type="button" 
                    onClick={() => onOpenDonateModal && onOpenDonateModal('كفالة يتيم')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading font-bold px-5 py-3 rounded-full glow-amber text-sm"
                  >
                    <Heart className="w-4 h-4 fill-current" /> اكفل هذا الطفل
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Carousel Arrows */}
          <button onClick={prevOrphan} className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-input bg-card shadow-sm hover:bg-accent hover:text-accent-foreground absolute top-1/2 -translate-y-1/2 -right-4 z-10" aria-label="السابق">
            <ChevronRight className="h-5 w-5" />
          </button>
          <button onClick={nextOrphan} className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-input bg-card shadow-sm hover:bg-accent hover:text-accent-foreground absolute top-1/2 -translate-y-1/2 -left-4 z-10" aria-label="التالي">
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 3. Urgent Medical Cases Carousel */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="text-center mb-12">
          <span className="text-accent font-heading text-sm tracking-widest font-bold">حالات طبية</span>
          <h2 className="mt-3 font-heading font-bold text-3xl lg:text-4xl text-primary leading-snug">حالات طبية تستعجل علاجكم</h2>
          <p className="mt-4 text-muted-foreground leading-loose text-lg max-w-2xl mx-auto">
            عمليات وأدوية وتجهيزات لأطفال وأسر لا يقوَون على تكلفتها.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalCases.slice(medicalIndex * 3, medicalIndex * 3 + 3).map((item) => (
              <div key={item.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="relative">
                    <img src={item.img} alt={item.name} className="w-full aspect-[4/3] object-cover" />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-heading font-bold px-3 py-1.5 rounded-full bg-accent text-accent-foreground">
                      <AlertCircle className="w-3.5 h-3.5" /> حالة طبية
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-lg text-primary">{item.name}</h3>
                      <span className="text-sm text-muted-foreground">{item.age}</span>
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm">{item.city}</p>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-muted-foreground">حالته:</span>
                        <span className="font-heading font-bold text-primary">{item.condition}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-foreground leading-loose text-sm flex items-start gap-2 flex-1">{item.desc}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button 
                    type="button" 
                    onClick={() => onOpenDonateModal && onOpenDonateModal('حالة طبية عاجلة')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading font-bold px-5 py-3 rounded-full glow-amber text-sm"
                  >
                    <Stethoscope className="w-4 h-4" /> ساهم في علاجه
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Carousel Arrows */}
          <button onClick={prevMedical} className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-input bg-card shadow-sm hover:bg-accent hover:text-accent-foreground absolute top-1/2 -translate-y-1/2 -right-4 z-10" aria-label="السابق">
            <ChevronRight className="h-5 w-5" />
          </button>
          <button onClick={nextMedical} className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-input bg-card shadow-sm hover:bg-accent hover:text-accent-foreground absolute top-1/2 -translate-y-1/2 -left-4 z-10" aria-label="التالي">
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 4. Academic Season Pass Rate Section (موسم 2024-2025: من إجتاز عامه الدراسي) */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div>
            <span className="text-accent font-heading text-sm tracking-widest font-bold">حصاد العام</span>
            <h2 className="mt-2 font-heading font-bold text-3xl lg:text-4xl text-primary">
              موسم 2024–2025: من إجتاز عامه الدراسي
            </h2>
            <p className="mt-3 text-muted-foreground leading-loose text-lg max-w-xl mx-auto">
              إنجاز: <strong className="text-accent font-bold">94%</strong> من الأطفال أتمّوا عامهم الدراسي — أي <strong className="text-primary font-bold">1860</strong> طفلاً
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
            {passStats.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center p-4 bg-card rounded-2xl border border-border shadow-sm">
                <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-secondary/20" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-accent" strokeDasharray={`${item.percent}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute font-heading font-bold text-lg text-accent">{item.percent}%</span>
                </div>
                <h3 className="font-heading font-bold text-base text-primary">{item.level}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Top Honor Roll Section (أبناؤنا المكفولون المتفوقون 2024-2025) */}
      <section className="py-20 px-4 bg-secondary/15">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div>
            <span className="text-accent font-heading text-sm tracking-widest font-bold">تميز وتفوق</span>
            <h2 className="mt-2 font-heading font-bold text-3xl lg:text-4xl text-primary">
              أبناؤنا المكفولون المتفوقون 2024–2025
            </h2>
            <p className="mt-3 text-muted-foreground leading-loose text-lg">
              أعلى معدل على مستوى الجمعية الرئيسي لعام 2024-2025 — تميزت وتفوّقت
            </p>
          </div>

          {/* Top Score Banner */}
          <div className="bg-card rounded-3xl border-2 border-accent/40 p-8 shadow-md inline-block max-w-sm mx-auto">
            <p className="text-xs font-heading font-bold text-muted-foreground uppercase tracking-widest">أعلى معدل في الجمعية</p>
            <p className="font-heading font-black text-5xl text-accent my-2">19.42 <span className="text-2xl text-muted-foreground font-normal">/ 20</span></p>
            <p className="font-heading font-bold text-primary text-base">مريم ب. — الابتدائي</p>
          </div>

          {/* Level Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {topScores.map((item, idx) => (
              <div key={idx} className="bg-card rounded-2xl border border-border p-4 text-center shadow-sm">
                <p className="text-xs text-muted-foreground font-medium mb-1">{item.level}</p>
                <p className="font-heading font-bold text-xl text-primary">{item.score}</p>
                <p className="text-xs text-accent font-bold mt-1">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section (شهادات من عاينوا الأثر) */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <span className="text-accent font-heading text-sm tracking-widest font-bold">شهادات</span>
            <h2 className="mt-2 font-heading font-bold text-3xl lg:text-4xl text-primary">
              شهادات من عاينوا الأثر
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className="bg-card rounded-3xl border border-border p-7 shadow-sm space-y-4">
                <Quote className="w-8 h-8 text-secondary" />
                <p className="text-foreground leading-loose text-base font-medium">« {item.quote} »</p>
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="font-heading font-bold text-primary text-sm">{item.author}</span>
                  <span className="text-xs text-accent font-bold bg-secondary/30 px-3 py-1 rounded-full">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Success Stories (حكاياتٌ تُروى… وأثرٌ لا يُنسى) */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-accent font-heading text-sm tracking-widest font-bold">أثر مستمر</span>
            <h2 className="mt-2 font-heading font-bold text-3xl lg:text-4xl text-primary">
              حكاياتٌ تُروى… وأثرٌ لا يُنسى
            </h2>
            <p className="mt-3 text-muted-foreground leading-loose text-lg max-w-xl mx-auto">
              يروى لنا هذا الكفيل كيف غيّرت هذه الكفالة مجرى حياة عدة أطفال وعائلاتهم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactStories.map((story, idx) => (
              <div key={idx} className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-56 overflow-hidden">
                    <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-heading font-bold text-xl text-primary">{story.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{story.desc}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <span className="inline-block text-xs font-heading font-bold bg-secondary/30 text-primary px-3.5 py-1.5 rounded-full">
                    {story.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Event Gallery (فعاليات وأيام مرت بأثرها) */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <span className="text-accent font-heading text-sm tracking-widest font-bold">أنشطة عامة</span>
            <h2 className="mt-2 font-heading font-bold text-3xl lg:text-4xl text-primary">
              فعاليات وأيام مرت بأثرها
            </h2>
            <p className="mt-3 text-muted-foreground leading-loose text-lg max-w-xl mx-auto">
              من استكشاف أثرها ونشاطاتها وتوزيع المستلزمات على القرى والأطفال
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden aspect-square border border-border shadow-sm">
                <img src={img.img} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 flex items-end p-3">
                  <p className="text-white text-xs font-heading font-bold">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQs Accordion */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center">
            <span className="text-accent font-heading text-sm tracking-widest font-bold">أسئلة الكفالة</span>
            <h2 className="mt-2 font-heading font-bold text-3xl lg:text-4xl text-primary">
              أسئلة شائعة حول كفالة الأيتام
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="border border-border rounded-2xl bg-card overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-right font-heading font-bold text-lg text-primary hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-muted-foreground ${isOpen ? 'rotate-180 text-accent' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-muted-foreground leading-loose text-sm border-t border-border/50 pt-4 bg-secondary/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
