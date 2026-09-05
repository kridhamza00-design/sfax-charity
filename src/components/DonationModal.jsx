import React, { useEffect, useRef, useState } from 'react';
import { Building2, Check, Copy, CreditCard, Heart, ShieldCheck, Smartphone, X } from 'lucide-react';

const RIB = '04 027 0123456789 01';
const amounts = ['20', '50', '90', '200'];

export default function DonationModal({ isOpen, onClose, defaultCause = 'صدقة عامة' }) {
  const [selectedAmount, setSelectedAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState(defaultCause);
  const [paymentMethod, setPaymentMethod] = useState('rib');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const closeButton = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    setCause(defaultCause);
    closeButton.current?.focus();
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, defaultCause, onClose]);

  const finalAmount = selectedAmount === 'custom' ? customAmount : selectedAmount;
  const validAmount = Number(finalAmount) > 0;
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(RIB); setCopied(true); window.setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validAmount) return;
    const record = { cause, amount: Number(finalAmount), paymentMethod, donorName, donorPhone, createdAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('sfax-donation-intents') || '[]');
    localStorage.setItem('sfax-donation-intents', JSON.stringify([...existing, record]));
    setSubmitted(true);
  };
  const resetAndClose = () => { setSubmitted(false); onClose(); };
  if (!isOpen) return null;

  return <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && resetAndClose()}>
    <section className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="donation-title">
      <header className="flex items-center justify-between border-b border-primary-light/40 bg-primary p-6 text-white"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary"><Heart className="h-5 w-5 fill-current" /></span><div><h2 id="donation-title" className="font-heading text-xl font-bold">تبرّع الآن</h2><p className="mt-0.5 text-xs text-secondary/80">اختر وسيلة الدعم الأنسب لك</p></div></div><button ref={closeButton} type="button" onClick={resetAndClose} className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" aria-label="إغلاق"><X className="h-6 w-6" /></button></header>
      <div className="flex-1 overflow-y-auto p-6">{submitted ? <Success amount={finalAmount} cause={cause} method={paymentMethod} onCopy={handleCopy} copied={copied} onClose={resetAndClose} /> : <form onSubmit={handleSubmit} className="space-y-6">
        <div><label htmlFor="donation-cause" className="mb-2 block text-sm font-bold text-primary">وجهة العطاء</label><select id="donation-cause" value={cause} onChange={(event) => setCause(event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-primary focus:border-accent focus:outline-none"><option>صدقة عامة</option><option>كفالة يتيم</option><option>زكاة المال</option><option>إفطار صائم</option><option>الحقيبة المدرسية</option><option>سقيا الماء</option><option>دعم المشاريع الخيرية</option></select></div>
        <fieldset><legend className="mb-2 text-sm font-bold text-primary">المبلغ بالدينار التونسي</legend><div className="grid grid-cols-4 gap-2">{amounts.map((amount) => <button key={amount} type="button" onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }} className={`rounded-xl border py-3 text-sm font-bold transition ${selectedAmount === amount ? 'border-accent bg-accent text-white shadow-md' : 'border-border bg-secondary/15 text-primary hover:bg-secondary/30'}`}>{amount} د.ت</button>)}</div><div className="mt-3 flex gap-3"><button type="button" onClick={() => setSelectedAmount('custom')} className={`rounded-xl border px-4 py-3 text-sm font-bold ${selectedAmount === 'custom' ? 'border-accent bg-accent text-white' : 'border-border bg-secondary/15 text-primary'}`}>مبلغ آخر</button>{selectedAmount === 'custom' && <input type="number" inputMode="decimal" min="1" required autoFocus value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} aria-label="المبلغ الآخر" placeholder="أدخل المبلغ" className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none" />}</div></fieldset>
        <fieldset><legend className="mb-2 text-sm font-bold text-primary">طريقة إتمام الدفع</legend><div className="grid grid-cols-3 gap-2"><Method icon={<Building2 />} label="تحويل بنكي" value="rib" current={paymentMethod} setMethod={setPaymentMethod} /><Method icon={<Smartphone />} label="D17 / Flouci" value="mobile" current={paymentMethod} setMethod={setPaymentMethod} /><Method icon={<CreditCard />} label="نقداً بالمقر" value="cash" current={paymentMethod} setMethod={setPaymentMethod} /></div>{paymentMethod === 'rib' && <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-secondary/40 bg-secondary/20 p-3 text-xs"><span dir="ltr" className="font-mono font-bold text-primary">{RIB}</span><CopyButton copied={copied} onCopy={handleCopy} /></div>}<p className="mt-2 text-xs text-muted-foreground">لن يتم خصم أي مبلغ من الموقع؛ اتبع تعليمات وسيلة الدفع بعد التأكيد.</p></fieldset>
        <div className="grid gap-3 border-t border-border pt-5 sm:grid-cols-2"><label className="text-xs text-muted-foreground">الاسم (اختياري)<input value={donorName} onChange={(event) => setDonorName(event.target.value)} autoComplete="name" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-primary focus:border-accent focus:outline-none" /></label><label className="text-xs text-muted-foreground">الهاتف (اختياري)<input value={donorPhone} onChange={(event) => setDonorPhone(event.target.value)} autoComplete="tel" inputMode="tel" dir="ltr" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-right text-sm text-primary focus:border-accent focus:outline-none" /></label></div>
        <button type="submit" disabled={!validAmount} className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-lg font-bold text-white shadow-lg transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"><Heart className="h-5 w-5 fill-current" />تأكيد نية التبرع بـ {finalAmount || '0'} د.ت</button><p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />سيُحفظ الطلب على هذا الجهاز فقط، ولا تُرسل البيانات إلى خادم.</p>
      </form>}</div>
    </section>
  </div>;
}

function Method({ icon, label, value, current, setMethod }) { return <button type="button" onClick={() => setMethod(value)} className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center text-xs transition ${current === value ? 'border-accent bg-accent/10 font-bold text-primary' : 'border-border text-muted-foreground hover:bg-secondary/10'}`}>{React.cloneElement(icon, { className: 'h-5 w-5 text-accent' })}<span>{label}</span></button>; }
function CopyButton({ copied, onCopy }) { return <button type="button" onClick={onCopy} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 font-bold text-accent transition hover:bg-secondary/30">{copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}{copied ? 'تم النسخ' : 'نسخ'}</button>; }
function Success({ amount, cause, method, onCopy, copied, onClose }) { return <div className="space-y-5 py-8 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"><Check className="h-10 w-10 stroke-[3]" /></div><h3 className="font-heading text-2xl font-bold text-primary">شكراً لعطائك</h3><p className="mx-auto max-w-md leading-relaxed text-muted-foreground">تم حفظ نية تبرعك بمبلغ <strong className="text-primary">{amount} د.ت</strong> لصالح <strong className="text-accent">{cause}</strong> على هذا الجهاز.</p>{method === 'rib' && <div className="mx-auto max-w-md rounded-2xl border border-secondary/40 bg-secondary/20 p-4"><p className="mb-2 text-xs text-muted-foreground">أتم التحويل إلى الحساب البنكي (RIB)</p><div className="flex items-center justify-center gap-3" dir="ltr"><strong className="font-mono text-primary">{RIB}</strong><CopyButton copied={copied} onCopy={onCopy} /></div></div>}<button type="button" onClick={onClose} className="rounded-full bg-primary px-8 py-3 font-bold text-white transition hover:bg-primary-hover">إغلاق</button></div>; }
