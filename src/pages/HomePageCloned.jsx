import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Heart, HandHeart, Users, Calendar, MapPin, Trophy, Quote, 
  GraduationCap, Stethoscope, HardHat, Clock, ArrowLeft, VolumeX, Sparkles, Check
} from 'lucide-react';
import SfaxMap from '../components/SfaxMap';
import StoryProgress from '../components/StoryProgress';

export default function HomePageCloned({ onOpenDonateModal }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Global scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Story Stages for Progress Indicator
  const storyStages = [
    { id: 'opening', title: 'الحكاية' },
    { id: 'city', title: 'المدينة' },
    { id: 'need', title: 'الحاجة' },
    { id: 'mission', title: 'الرسالة' },
    { id: 'projects', title: 'المبادرات' },
    { id: 'story-spotlight', title: 'القصة' },
    { id: 'impact', title: 'الأثر' },
    { id: 'community', title: 'المجتمع' },
    { id: 'action', title: 'العطاء' }
  ];

  // Track active section index on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      storyStages.forEach((stage, idx) => {
        const el = document.getElementById(stage.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveIndex(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero Animations
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroBgScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroBgY = useTransform(heroScroll, [0, 1], ['0%', '20%']);
  const heroText1Y = useTransform(heroScroll, [0, 0.4], ['0px', '-40px']);
  const heroText1Opacity = useTransform(heroScroll, [0, 0.4], [1, 0.2]);
  const heroText2Y = useTransform(heroScroll, [0.15, 0.6], ['40px', '0px']);
  const heroText2Opacity = useTransform(heroScroll, [0.15, 0.5], [0, 1]);

  // Need Section Animation
  const needRef = useRef(null);
  const isNeedInView = useInView(needRef, { margin: '-20% 0px -20% 0px' });

  // Mission Section Animation
  const missionRef = useRef(null);
  const isMissionInView = useInView(missionRef, { margin: '-20% 0px -20% 0px' });

  // Impact Counters Animation
  const impactRef = useRef(null);
  const isImpactInView = useInView(impactRef, { margin: '-20% 0px -20% 0px' });

  return (
    <div ref={containerRef} className="flex-1 bg-background text-primary selection:bg-secondary selection:text-primary relative overflow-x-hidden">
      {/* Persistent Desktop & Mobile Story Progress */}
      <StoryProgress activeIndex={activeIndex} storyStages={storyStages} />

      {/* ==========================================
          1. HERO / OPENING — "THE CITY HAS STORIES"
          ========================================== */}
      <section 
        id="opening" 
        ref={heroRef} 
        className="relative -mt-20 min-h-screen flex items-center justify-center overflow-hidden bg-primary text-white"
      >
        {/* Background Image with Parallax & Subtle Zoom */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={reducedMotion ? {} : { scale: heroBgScale, y: heroBgY }}
        >
          <img 
            src="https://images.unsplash.com/photo-1458966480358-a0ac42de0a7a?w=2000&q=80&auto=format&fit=crop" 
            alt="شجرة الزيتون في صفاقس" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/90" />
        </motion.div>

        {/* Hero Narrative Compositions */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center space-y-8">
          {/* Subtitle Line 1: Curiosity */}
          <motion.div 
            style={reducedMotion ? {} : { y: heroText1Y, opacity: heroText1Opacity }}
            className="inline-block"
          >
            <span className="text-secondary font-heading font-bold text-lg sm:text-xl tracking-widest bg-black/30 backdrop-blur-md px-5 py-2 rounded-full border border-secondary/30">
              كلّ مدينة عندها حكايات.
            </span>
          </motion.div>

          {/* Subtitle Line 2: Emerging on Scroll */}
          <motion.div 
            style={reducedMotion ? {} : { y: heroText2Y, opacity: heroText2Opacity }}
            className="block"
          >
            <span className="text-accent font-heading font-extrabold text-xl sm:text-2xl tracking-wide">
              وكلّ حكاية تستحقّ فرصة.
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.35] text-shadow-hero max-w-4xl mx-auto"
          >
            عطاء بسيط منكم، يصنع فارقاً كبيراً في حياة
          </motion.h1>

          {/* Emerging Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => onOpenDonateModal && onOpenDonateModal()} 
              type="button" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-accent text-white font-heading font-bold px-8 py-4 rounded-full glow-amber text-lg shadow-xl"
            >
              <Heart className="w-5 h-5 fill-current text-white" />
              <span>تبرّع الآن</span>
            </button>

            <Link 
              to="/orphan" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-md text-white border border-white/30 font-heading font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-colors text-lg"
            >
              <HandHeart className="w-5 h-5 text-secondary" />
              <span>كفالة يتيم</span>
            </Link>

            <button 
              onClick={() => onOpenDonateModal && onOpenDonateModal('تطوع')} 
              type="button" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-secondary/20 backdrop-blur-md text-secondary border border-secondary/40 font-heading font-bold px-8 py-4 rounded-full hover:bg-secondary/30 transition-colors text-lg"
            >
              <Users className="w-5 h-5 text-secondary" />
              <span>التطوع معنا</span>
            </button>
          </motion.div>
        </div>

        {/* Ambient Audio Indicator */}
        <button 
          className="absolute bottom-6 left-6 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors" 
          aria-label="تفعيل الصوت"
        >
          <VolumeX className="w-5 h-5 text-secondary" />
        </button>
      </section>

      {/* ==========================================
          2. TRANSITION — "THE CITY"
          ========================================== */}
      <section id="city" className="py-20 px-4 bg-primary/95 text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-secondary font-heading text-sm font-bold tracking-widest uppercase">صفاقس والعطاء</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-secondary leading-snug">
              في صفاقس، الخير موجود في كل مكان.
            </h2>
            <p className="text-white/80 text-xl leading-relaxed font-heading max-w-2xl mx-auto pt-2">
              لكن موش كل الناس تبدأ من نفس النقطة.
            </p>
          </motion.div>
        </div>

        {/* Subtle background connecting grid lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <div className="w-96 h-96 border border-dashed border-secondary rounded-full animate-spin duration-1000" style={{ animationDuration: '60s' }} />
        </div>
      </section>

      {/* ==========================================
          3. THE NEED — HUMAN STORIES & CATEGORIES
          ========================================== */}
      <section id="need" ref={needRef} className="py-24 px-4 bg-background relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-accent font-heading text-sm font-bold tracking-widest uppercase">الاحتياجات الإنسانية</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
              احتياجات تتطلّب سندا حقيقيا
            </h2>
          </div>

          {/* Progressive 3 Needs Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Story 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-3xl border border-border p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/30 text-primary flex items-center justify-center font-heading font-bold text-xl group-hover:bg-accent group-hover:text-white transition-colors">
                  01
                </div>
                <h3 className="font-heading font-bold text-2xl text-primary">طفل يحتاج فرصة</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  كفالة الأيتام وتأمين المقاعد المدرسية والأدوات لمواصلة التعلم بكرامة ودون انقطاع.
                </p>
              </div>
              <div className="pt-6 border-t border-border/60 mt-6">
                <Link to="/orphan" className="inline-flex items-center gap-2 text-accent font-heading font-bold text-sm hover:gap-3 transition-all">
                  <span>اكفل طفلاً الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Story 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-3xl border border-border p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/30 text-primary flex items-center justify-center font-heading font-bold text-xl group-hover:bg-accent group-hover:text-white transition-colors">
                  02
                </div>
                <h3 className="font-heading font-bold text-2xl text-primary">عائلة تحتاج سند</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  رعاية العائلات المتعفّفة وتوفير المؤن الغذائية والإعانات الموسمية وتأمين كرامة العيش.
                </p>
              </div>
              <div className="pt-6 border-t border-border/60 mt-6">
                <button onClick={() => onOpenDonateModal && onOpenDonateModal('رعاية العائلات المتعففة')} className="inline-flex items-center gap-2 text-accent font-heading font-bold text-sm hover:gap-3 transition-all">
                  <span>ساند عائلة متعففة</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Story 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card rounded-3xl border border-border p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/30 text-primary flex items-center justify-center font-heading font-bold text-xl group-hover:bg-accent group-hover:text-white transition-colors">
                  03
                </div>
                <h3 className="font-heading font-bold text-2xl text-primary">حالة تحتاج علاج</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  دعم المرضى وإعانة ذوي الحاجات الخاصة وتأمين تكاليف العمليات الجراحية والأدوية.
                </p>
              </div>
              <div className="pt-6 border-t border-border/60 mt-6">
                <button onClick={() => onOpenDonateModal && onOpenDonateModal('إعانة المرضى')} className="inline-flex items-center gap-2 text-accent font-heading font-bold text-sm hover:gap-3 transition-all">
                  <span>ساهم في علاج مريض</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Narrative Conclusion transition */}
          <div className="text-center pt-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-primary text-secondary font-heading font-extrabold text-2xl sm:text-3xl px-8 py-4 rounded-full shadow-lg"
            >
              وهنا يبدأ دورنا.
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. MISSION / ORGANIZATION — EDITORIAL
          ========================================== */}
      <section id="mission" ref={missionRef} className="py-24 px-4 bg-secondary/20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="font-heading font-bold text-2xl sm:text-3xl text-muted-foreground">
              ما نجمّوش نغيّروا كل شيء.
            </p>
            <p className="font-heading font-extrabold text-3xl sm:text-5xl text-primary leading-tight">
              أما نجمّوا نغيّروا حياة شخص واحد.
            </p>
          </motion.div>

          <div className="my-10 h-px bg-border max-w-xs mx-auto" />

          {/* Hadith Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-3xl border border-border p-8 shadow-sm space-y-4"
          >
            <span className="inline-block text-accent font-heading text-sm font-bold tracking-widest uppercase">حديث شريف</span>
            <p className="font-heading font-medium text-3xl sm:text-4xl lg:text-5xl leading-[1.6] text-primary">
              « مَا نَقَصَ مَالٌ مِنْ صَدَقَةٍ »
            </p>
            <p className="text-muted-foreground text-lg font-heading">صدق رسول الله ﷺ</p>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          5. PROJECTS — "وين يمشي تبرّعك؟"
          ========================================== */}
      <section id="projects" className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-accent font-heading text-sm font-bold tracking-widest uppercase">وجهة العطاء</span>
            <h2 className="font-heading font-extrabold text-4xl lg:text-5xl text-primary">
              وين يمشي تبرّعك؟
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto font-heading">
              تبرعك يتوجّه مباشر لجمعيتنا في صفاقس لدعم مشاريع وحملات جارية تنقذ عائلات وأطفال.
            </p>
          </div>

          {/* Projects Grid with Masked Reveals & Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80&auto=format&fit=crop" 
                    alt="إفطار صائم في صفاقس" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 right-4 bg-primary text-white text-xs font-heading font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Clock className="w-3.5 h-3.5" /> متبقٍ 9 يوماً
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-heading font-bold text-xl text-primary leading-snug">إفطار صائم في صفاقس</h3>
                  <div className="space-y-2">
                    <div className="h-3 rounded-full bg-secondary/40 overflow-hidden">
                      <div className="h-full progress-gradient rounded-full" style={{ width: '74%' }} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-heading font-bold text-primary">18,400 د.ت</span>
                      <span className="text-muted-foreground">الهدف 25,000 د.ت</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button 
                  onClick={() => onOpenDonateModal && onOpenDonateModal('إفطار صائم')} 
                  className="w-full inline-flex items-center justify-center gap-2 text-accent font-heading font-bold hover:gap-3 transition-all pt-2"
                >
                  <span>ساهم الآن</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </motion.article>

            {/* Project 2 */}
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80&auto=format&fit=crop" 
                    alt="موسم المدارس — حقيبة لكل يتيم" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 right-4 bg-primary text-white text-xs font-heading font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Clock className="w-3.5 h-3.5" /> متبقٍ 21 يوماً
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-heading font-bold text-xl text-primary leading-snug">موسم المدارس — حقيبة لكل يتيم</h3>
                  <div className="space-y-2">
                    <div className="h-3 rounded-full bg-secondary/40 overflow-hidden">
                      <div className="h-full progress-gradient rounded-full" style={{ width: '64%' }} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-heading font-bold text-primary">9,600 د.ت</span>
                      <span className="text-muted-foreground">الهدف 15,000 د.ت</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button 
                  onClick={() => onOpenDonateModal && onOpenDonateModal('حقيبة لكل يتيم')} 
                  className="w-full inline-flex items-center justify-center gap-2 text-accent font-heading font-bold hover:gap-3 transition-all pt-2"
                >
                  <span>ساهم الآن</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </motion.article>

            {/* Project 3 */}
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&q=80&auto=format&fit=crop" 
                    alt="سقيا الماء — بئر للقرى" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 right-4 bg-primary text-white text-xs font-heading font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Clock className="w-3.5 h-3.5" /> متبقٍ 34 يوماً
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-heading font-bold text-xl text-primary leading-snug">سقيا الماء — بئر للقرى</h3>
                  <div className="space-y-2">
                    <div className="h-3 rounded-full bg-secondary/40 overflow-hidden">
                      <div className="h-full progress-gradient rounded-full" style={{ width: '78%' }} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-heading font-bold text-primary">31,200 د.ت</span>
                      <span className="text-muted-foreground">الهدف 40,000 د.ت</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button 
                  onClick={() => onOpenDonateModal && onOpenDonateModal('سقيا الماء')} 
                  className="w-full inline-flex items-center justify-center gap-2 text-accent font-heading font-bold hover:gap-3 transition-all pt-2"
                >
                  <span>ساهم الآن</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. HUMAN STORY SECTION — SPOTLIGHT
          ========================================== */}
      <section id="story-spotlight" className="py-24 px-4 bg-secondary/15 border-y border-border/40">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-accent font-heading text-sm font-bold tracking-widest uppercase">حكايات غيرت حياة</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary">
              هذه حكاية واحدة فقط.
            </h2>
          </div>

          {/* Featured Orphan Case */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-card rounded-3xl p-8 lg:p-12 border border-border shadow-sm">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[3/4]">
                <img 
                  src="https://images.unsplash.com/photo-1637034132655-c500725d908b?w=1200&q=80&auto=format&fit=crop" 
                  alt="أمين" 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-4 right-4 bg-accent text-white text-xs font-heading font-bold px-4 py-2 rounded-full shadow-md">
                  حالة عاجلة
                </span>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center justify-around text-center border border-white/50">
                  <div>
                    <p className="font-heading font-bold text-primary">أمين</p>
                    <p className="text-xs text-muted-foreground">الاسم</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <p className="font-heading font-bold text-primary">9 سنوات</p>
                    <p className="text-xs text-muted-foreground">العمر</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <p className="font-heading font-bold text-primary">صفاقس</p>
                    <p className="text-xs text-muted-foreground">المدينة</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-accent font-heading text-sm font-bold tracking-widest uppercase">طفل ينتظر سندا</span>
              <h3 className="font-heading font-bold text-3xl lg:text-4xl text-primary leading-snug">
                قصة أمين… طفل يحلم بغدٍ أفضل
              </h3>
              <p className="text-muted-foreground leading-loose text-lg font-heading">
                كانت تحتاج فقط إلى فرصة... وصلها الدعم... وبدأت من جديد.
              </p>
              <p className="text-foreground leading-loose text-base">
                فقد أمين أباه وعمره خمس سنوات، تعيله أمّه التي تسهر على تربيته بقليلٍ من الكسب. حلمه أن يكمل دراسته ويصبح معلّماً، وكفالتك الشهرية تكفل له مقعداً في المدرسة وكرامةً لا تنكسر.
              </p>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-secondary/20 rounded-2xl p-4">
                  <p className="font-heading font-bold text-2xl text-primary">90 د.ت</p>
                  <p className="text-xs text-muted-foreground mt-1">المبلغ الشهري</p>
                </div>
                <div className="bg-secondary/20 rounded-2xl p-4">
                  <p className="font-heading font-bold text-2xl text-primary">63 د.ت</p>
                  <p className="text-xs text-muted-foreground mt-1">مؤمَّن فعلاً</p>
                </div>
                <div className="bg-secondary/20 rounded-2xl p-4">
                  <p className="font-heading font-bold text-2xl text-primary">3</p>
                  <p className="text-xs text-muted-foreground mt-1">كافلون جزئيون</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-3 rounded-full bg-secondary/40 overflow-hidden">
                  <div className="h-full progress-gradient rounded-full" style={{ width: '70%' }} />
                </div>
                <p className="text-sm text-muted-foreground">تم تأمين 70% من الكفالة الشهرية</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button 
                  type="button" 
                  onClick={() => onOpenDonateModal && onOpenDonateModal('كفالة يتيم')}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white font-heading font-bold px-7 py-4 rounded-full glow-amber shadow-md"
                >
                  <Heart className="w-5 h-5 fill-current text-white" /> اكفل أمين الآن
                </button>
                <Link 
                  to="/orphan" 
                  className="inline-flex items-center justify-center gap-2 text-primary font-heading font-bold px-7 py-4 rounded-full border-2 border-primary/20 hover:bg-secondary/20 transition-colors"
                >
                  تعرّف على كل الحالات <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="font-heading font-extrabold text-2xl text-primary inline-block bg-white border border-border px-6 py-3 rounded-full shadow-sm">
              وهي ليست وحدها.
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. IMPACT REVEAL — "كل رقم هنا هو إنسان"
          ========================================== */}
      <section id="impact" ref={impactRef} className="py-24 px-4 bg-primary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-3">
            <span className="text-secondary font-heading text-sm font-bold tracking-widest uppercase">أرقام ومستقبل</span>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-secondary">
              كل رقم هنا هو إنسان.
            </h2>
          </div>

          {/* Progressive Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 text-center space-y-3"
            >
              <Heart className="w-10 h-10 text-secondary mx-auto fill-current" />
              <p className="font-heading font-black text-5xl lg:text-6xl text-secondary">1986</p>
              <p className="text-white/80 font-heading font-bold text-lg">طفل مكفول حالياً</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 text-center space-y-3"
            >
              <Calendar className="w-10 h-10 text-secondary mx-auto" />
              <p className="font-heading font-black text-5xl lg:text-6xl text-secondary">12</p>
              <p className="text-white/80 font-heading font-bold text-lg">سنة من العطاء</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 text-center space-y-3"
            >
              <Users className="w-10 h-10 text-secondary mx-auto" />
              <p className="font-heading font-black text-5xl lg:text-6xl text-secondary">320</p>
              <p className="text-white/80 font-heading font-bold text-lg">متطوع نشط</p>
            </motion.div>
          </div>

          {/* Interactive Sfax Governorate Map Section */}
          <div className="pt-8">
            <SfaxMap />
          </div>

          {/* Goal Circular Gauge & Concludes */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(224,229,147,0.2)" strokeWidth="16" />
                  <circle cx="100" cy="100" r="86" fill="none" stroke="url(#goalGrad)" strokeWidth="16" strokeLinecap="round" strokeDasharray="540.35" strokeDashoffset="113.47" />
                  <defs>
                    <linearGradient id="goalGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E0E593" />
                      <stop offset="100%" stopColor="#D97B00" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading font-bold text-5xl text-secondary">79%</span>
                  <span className="text-secondary/80 text-sm mt-1">تم إنجازه</span>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right space-y-4">
              <span className="text-accent font-heading text-sm font-bold tracking-widest uppercase">هدفنا السنوي</span>
              <h3 className="font-heading font-bold text-3xl text-white leading-snug">
                هدفنا كفالة 2500 يتيم — واليوم نرعى 1986 طفلاً
              </h3>
              <p className="text-white/80 text-base leading-relaxed">
                أصبحنا قريبين جداً من تحقيق الحلم… بقي 514 طفلاً فقط، وننتظر مساعدتكم لإتمامه.
              </p>
              <button 
                onClick={() => onOpenDonateModal && onOpenDonateModal('إكمال الهدف السنوي')} 
                className="mt-2 inline-flex items-center gap-2 bg-accent text-white font-heading font-bold px-8 py-4 rounded-full glow-amber shadow-lg"
              >
                <Heart className="w-5 h-5 fill-current text-white" /> كن سبباً في إكمال الهدف
              </button>
            </div>
          </div>

          <div className="text-center pt-4">
            <span className="text-secondary font-heading font-bold text-xl tracking-wide">
              كل إنسان عنده حكاية.
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================
          8. COMMUNITY — "التغيير ما يصنعوش شخص واحد"
          ========================================== */}
      <section id="community" className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <p className="text-muted-foreground font-heading text-xl">التغيير ما يصنعوش شخص واحد.</p>
            <h2 className="font-heading font-black text-4xl lg:text-5xl text-primary">
              يصنعوه الناس الكل.
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-3xl p-8 border border-border shadow-sm space-y-6 flex flex-col justify-between">
              <Quote className="w-10 h-10 text-secondary" />
              <p className="text-foreground leading-loose text-base font-medium">
                منذ أن كفلني أحد المحسنين، عدت إلى مدرستي وأشعر أن لي أباً لم يرني ولم ينساني.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-secondary font-heading font-bold text-lg">م</span>
                <div>
                  <p className="font-heading font-bold text-primary text-base">محمد الأمين</p>
                  <p className="text-xs text-muted-foreground">طفل مكفول</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 border border-border shadow-sm space-y-6 flex flex-col justify-between">
              <Quote className="w-10 h-10 text-secondary" />
              <p className="text-foreground leading-loose text-base font-medium">
                أحسب كل دينارٍ أدفعه بذرة زيتونٍ ستظلّل يوماً ظلال طفلٍ بعيد.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-secondary font-heading font-bold text-lg">س</span>
                <div>
                  <p className="font-heading font-bold text-primary text-base">سامية بن علي</p>
                  <p className="text-xs text-muted-foreground">متبرّعة</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 border border-border shadow-sm space-y-6 flex flex-col justify-between">
              <Quote className="w-10 h-10 text-secondary" />
              <p className="text-foreground leading-loose text-base font-medium">
                تطوّعي في حملات الجمعية علّمني أن العطاء يعيد للحياة معناها قبل أن يعيد للمحتاج.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-secondary font-heading font-bold text-lg">ك</span>
                <div>
                  <p className="font-heading font-bold text-primary text-base">كريم العباسي</p>
                  <p className="text-xs text-muted-foreground">متطوّع</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          9. ACTION / DONATE — "توا جاء دورك"
          ========================================== */}
      <section id="action" className="py-24 px-4 bg-secondary/15 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-accent font-heading text-sm font-bold tracking-widest uppercase">خطوتك الآن</span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-primary">
              توا جاء دورك.
            </h2>
            <p className="text-muted-foreground text-xl font-heading leading-relaxed">
              يمكن مساهمتك تبدو صغيرة... لكنها جزء من شيء أكبر.
            </p>
            <p className="text-primary font-heading font-extrabold text-2xl pt-2">
              مع بعضنا، نصنعوا الفرق.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => onOpenDonateModal && onOpenDonateModal()} 
              type="button" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-accent text-white font-heading font-bold px-10 py-5 rounded-full glow-amber text-xl shadow-xl"
            >
              <Heart className="w-6 h-6 fill-current text-white" />
              <span>تبرّع الآن</span>
            </button>

            <Link 
              to="/initiatives" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-card border-2 border-primary/20 text-primary font-heading font-bold px-8 py-5 rounded-full hover:bg-secondary/20 transition-colors text-xl"
            >
              <span>اكتشف مشاريعنا</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          10. FINAL CALLBACK — FULL CIRCLE
          ========================================== */}
      <section className="py-20 px-4 bg-primary text-white text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="font-heading font-bold text-2xl sm:text-3xl text-secondary">
            كلّ مدينة عندها حكايات... وكلّ حكاية تستحقّ فرصة.
          </p>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-white/70 text-sm font-heading">
            جمعية خيرية صفاقس — منصة العطاء الإلكترونية
          </p>
        </div>
      </section>
    </div>
  );
}
