import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import DonationModal from './components/DonationModal';

// Pages
const HomePageCloned = lazy(() => import('./pages/HomePageCloned'));
const Donate = lazy(() => import('./pages/Donate'));
const Initiatives = lazy(() => import('./pages/Initiatives'));
const Initiatives01 = lazy(() => import('./pages/Initiatives01'));
const Initiatives02 = lazy(() => import('./pages/Initiatives02'));
const Initiatives03 = lazy(() => import('./pages/Initiatives03'));
const Initiatives04 = lazy(() => import('./pages/Initiatives04'));
const Initiatives05 = lazy(() => import('./pages/Initiatives05'));
const Initiatives06 = lazy(() => import('./pages/Initiatives06'));
const Initiatives07 = lazy(() => import('./pages/Initiatives07'));
const Initiatives08 = lazy(() => import('./pages/Initiatives08'));
const Initiatives09 = lazy(() => import('./pages/Initiatives09'));
const Initiatives10 = lazy(() => import('./pages/Initiatives10'));
const Campaigns = lazy(() => import('./pages/Campaigns'));
const Orphan = lazy(() => import('./pages/Orphan'));
const About = lazy(() => import('./pages/About'));
const AboutAssociation = lazy(() => import('./pages/AboutAssociation'));
const AboutTransparency = lazy(() => import('./pages/AboutTransparency'));
const AboutCases = lazy(() => import('./pages/AboutCases'));
const Volunteer = lazy(() => import('./pages/Volunteer'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles = {
      '/': 'خيرية صفاقس | عطاء يصنع الفرق',
      '/donate': 'التبرع | خيرية صفاقس',
      '/initiatives': 'مبادراتنا | خيرية صفاقس',
      '/campaigns': 'حملاتنا | خيرية صفاقس',
      '/orphan': 'كفالة الأيتام | خيرية صفاقس',
      '/about': 'عن خيرية صفاقس',
      '/volunteer': 'التطوع | خيرية صفاقس',
    };
    document.title = titles[pathname] || 'خيرية صفاقس | عطاء يصنع الفرق';
  }, [pathname]);
  return null;
}

export default function App() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donateCause, setDonateCause] = useState('صدقة عامة');

  const handleOpenDonateModal = (cause = 'صدقة عامة') => {
    setDonateCause(cause);
    setDonateModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-primary flex flex-col font-body selection:bg-secondary selection:text-primary">
        <TopBar />
        <Navbar onOpenDonateModal={() => handleOpenDonateModal('صدقة عامة')} />

        <main id="main-content" tabIndex="-1" className="flex flex-1 flex-col outline-none">
          <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center px-4 text-center text-muted-foreground" role="status">جارٍ تحميل الصفحة…</div>}>
          <Routes>
            <Route path="/" element={<HomePageCloned onOpenDonateModal={() => handleOpenDonateModal('صدقة عامة')} />} />
            <Route path="/donate" element={<Donate onOpenDonateModal={() => handleOpenDonateModal('صدقة عامة')} />} />
            
            {/* Initiatives Hub & Individual Initiative Pages 01-10 */}
            <Route path="/initiatives" element={<Initiatives onOpenDonateModal={() => handleOpenDonateModal('مبادرات خيرية')} />} />
            <Route path="/initiatives/01" element={<Initiatives01 onOpenDonateModal={() => handleOpenDonateModal('مشروع إخاء لكفالة الأيتام')} />} />
            <Route path="/initiatives/1" element={<Initiatives01 onOpenDonateModal={() => handleOpenDonateModal('مشروع إخاء لكفالة الأيتام')} />} />
            <Route path="/initiatives/02" element={<Initiatives02 onOpenDonateModal={() => handleOpenDonateModal('مشروع أسرتي لإعانة الزواج')} />} />
            <Route path="/initiatives/2" element={<Initiatives02 onOpenDonateModal={() => handleOpenDonateModal('مشروع أسرتي لإعانة الزواج')} />} />
            <Route path="/initiatives/03" element={<Initiatives03 onOpenDonateModal={() => handleOpenDonateModal('المشاريع الصغرى')} />} />
            <Route path="/initiatives/3" element={<Initiatives03 onOpenDonateModal={() => handleOpenDonateModal('المشاريع الصغرى')} />} />
            <Route path="/initiatives/04" element={<Initiatives04 onOpenDonateModal={() => handleOpenDonateModal('الحملات الموسمية')} />} />
            <Route path="/initiatives/4" element={<Initiatives04 onOpenDonateModal={() => handleOpenDonateModal('الحملات الموسمية')} />} />
            <Route path="/initiatives/05" element={<Initiatives05 onOpenDonateModal={() => handleOpenDonateModal('إعانة المرضى')} />} />
            <Route path="/initiatives/5" element={<Initiatives05 onOpenDonateModal={() => handleOpenDonateModal('إعانة المرضى')} />} />
            <Route path="/initiatives/06" element={<Initiatives06 onOpenDonateModal={() => handleOpenDonateModal('الدعم المدرسي')} />} />
            <Route path="/initiatives/6" element={<Initiatives06 onOpenDonateModal={() => handleOpenDonateModal('الدعم المدرسي')} />} />
            <Route path="/initiatives/07" element={<Initiatives07 onOpenDonateModal={() => handleOpenDonateModal('الشراكة مع المؤسسات')} />} />
            <Route path="/initiatives/7" element={<Initiatives07 onOpenDonateModal={() => handleOpenDonateModal('الشراكة مع المؤسسات')} />} />
            <Route path="/initiatives/08" element={<Initiatives08 onOpenDonateModal={() => handleOpenDonateModal('كفالة المسنين')} />} />
            <Route path="/initiatives/8" element={<Initiatives08 onOpenDonateModal={() => handleOpenDonateModal('كفالة المسنين')} />} />
            <Route path="/initiatives/09" element={<Initiatives09 onOpenDonateModal={() => handleOpenDonateModal('سقيا الماء وحفر الآبار')} />} />
            <Route path="/initiatives/9" element={<Initiatives09 onOpenDonateModal={() => handleOpenDonateModal('سقيا الماء وحفر الآبار')} />} />
            <Route path="/initiatives/10" element={<Initiatives10 onOpenDonateModal={() => handleOpenDonateModal('رعاية العائلات المتعففة')} />} />

            <Route path="/campaigns" element={<Campaigns onOpenDonateModal={() => handleOpenDonateModal('حملات جارية')} />} />
            <Route path="/orphan" element={<Orphan onOpenDonateModal={(cause) => handleOpenDonateModal(cause || 'كفالة يتيم')} />} />
            <Route path="/about" element={<About onOpenDonateModal={() => handleOpenDonateModal('صدقة عامة')} />} />
            <Route path="/about/association" element={<AboutAssociation onOpenDonateModal={() => handleOpenDonateModal('صدقة عامة')} />} />
            <Route path="/about/transparency" element={<AboutTransparency onOpenDonateModal={() => handleOpenDonateModal('صدقة عامة')} />} />
            <Route path="/about/cases" element={<AboutCases onOpenDonateModal={() => handleOpenDonateModal('صدقة عامة')} />} />
            <Route path="/volunteer" element={<Volunteer onOpenDonateModal={() => handleOpenDonateModal('تطوع')} />} />

            <Route path="*" element={<HomePageCloned onOpenDonateModal={() => handleOpenDonateModal('صدقة عامة')} />} />
          </Routes>
          </Suspense>
        </main>

        <Footer />
        <MobileBottomBar onOpenDonateModal={() => handleOpenDonateModal('صدقة عامة')} />
        <DonationModal
          isOpen={donateModalOpen}
          onClose={() => setDonateModalOpen(false)}
          defaultCause={donateCause}
        />
      </div>
    </Router>
  );
}
