import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import DonationModal from './components/DonationModal';

// Pages
import HomePageCloned from './pages/HomePageCloned';
import Donate from './pages/Donate';
import Initiatives from './pages/Initiatives';
import Initiatives01 from './pages/Initiatives01';
import Initiatives02 from './pages/Initiatives02';
import Initiatives03 from './pages/Initiatives03';
import Initiatives04 from './pages/Initiatives04';
import Initiatives05 from './pages/Initiatives05';
import Initiatives06 from './pages/Initiatives06';
import Initiatives07 from './pages/Initiatives07';
import Initiatives08 from './pages/Initiatives08';
import Initiatives09 from './pages/Initiatives09';
import Initiatives10 from './pages/Initiatives10';
import Campaigns from './pages/Campaigns';
import Orphan from './pages/Orphan';
import About from './pages/About';
import AboutAssociation from './pages/AboutAssociation';
import AboutTransparency from './pages/AboutTransparency';
import AboutCases from './pages/AboutCases';
import Volunteer from './pages/Volunteer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
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

        <main className="flex-1 flex flex-col">
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
