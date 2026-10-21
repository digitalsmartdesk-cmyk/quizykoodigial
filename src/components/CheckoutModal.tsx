'use client';

import { useState } from 'react';
import Image from 'next/image';

type CheckoutState = 'select' | 'processing' | 'success' | 'failed' | 'cancelled';

interface Pack {
  id: string;
  label: string;
  tests: number;
  price: number;
  perTest: string;
  savings?: string;
  popular?: boolean;
}

const PACKS: Pack[] = [
  { id: 'single', label: 'Single test', tests: 1, price: 15, perTest: '₹15 per test' },
  { id: 'five', label: 'Pack of 5', tests: 5, price: 59, perTest: '₹11.8 per test', savings: 'Save 21%', popular: true },
  { id: 'fifteen', label: 'Pack of 15', tests: 15, price: 149, perTest: '₹9.9 per test', savings: 'Save 34%' },
];

interface Props {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: Props) {
  const [selected, setSelected] = useState('five');
  const [state, setState] = useState<CheckoutState>('select');

  const pack = PACKS.find(p => p.id === selected) ?? PACKS[1];

  function handlePay() {
    setState('processing');
    // In production, integrate Razorpay SDK here
    setTimeout(() => setState('success'), 2000);
  }

  if (state === 'processing') {
    return (
      <ModalShell onClose={onClose}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '32px 20px' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: 'linear-gradient(160deg,#FFE9A8,#FFCD2E)', overflow: 'hidden' }}>
            <Image src="/images/koo-thinking.jpg" alt="Koo thinking" width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <Spinner />
          <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 18, color: '#15235E' }}>Processing payment…</div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 13, color: '#9aa3b8' }}>Please don't close this window</div>
        </div>
      </ModalShell>
    );
  }

  if (state === 'success') {
    return (
      <ModalShell onClose={onClose}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '32px 20px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: 'linear-gradient(160deg,#B8F5B0,#5DCC4E)', overflow: 'hidden' }}>
            <Image src="/images/koo-cheering.jpg" alt="Koo cheering" width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 22, color: '#15235E' }}>Payment successful!</div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 13, color: '#5b6784', marginTop: 6 }}>
              You have {pack.tests} test{pack.tests > 1 ? 's' : ''} ready to use.
            </div>
          </div>
          <div style={{ background: '#EAF7E9', border: '1.5px solid #5DCC4E', borderRadius: 14, padding: '12px 16px', width: '100%' }}>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 12, color: '#5DCC4E' }}>₹{pack.price} paid · {pack.tests} test{pack.tests > 1 ? 's' : ''} added</div>
          </div>
          <button onClick={onClose} style={{ height: 52, background: '#2D6CDF', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 16, color: '#fff', cursor: 'pointer', width: '100%' }}>
            Start a quiz →
          </button>
        </div>
      </ModalShell>
    );
  }

  if (state === 'failed' || state === 'cancelled') {
    return (
      <ModalShell onClose={onClose}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '32px 20px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: 'linear-gradient(160deg,#FFE9A8,#FFCD2E)', overflow: 'hidden' }}>
            <Image src="/images/koo-wink.jpg" alt="Koo wink" width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 22, color: '#15235E' }}>
              {state === 'cancelled' ? 'Payment cancelled' : 'Payment failed'}
            </div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 13, color: '#5b6784', marginTop: 6 }}>
              No worries — nothing was charged.
            </div>
          </div>
          <button onClick={() => setState('select')} style={{ height: 52, background: '#2D6CDF', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 16, color: '#fff', cursor: 'pointer', width: '100%' }}>
            Try again →
          </button>
          <button onClick={onClose} style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, color: '#9aa3b8', background: 'none', cursor: 'pointer', padding: '8px 0' }}>
            Maybe later
          </button>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose}>
      <div style={{ padding: '20px 20px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 20, color: '#15235E' }}>Buy tests</div>

        {PACKS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: selected === p.id ? '#EAF1FC' : '#fff',
              border: selected === p.id ? '2px solid #2D6CDF' : '1.5px solid #E7E2D4',
              borderRadius: 14, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', width: '100%',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 16, color: '#15235E' }}>{p.label}</span>
                {p.popular && (
                  <span style={{ background: '#2D6CDF', color: '#fff', borderRadius: 999, padding: '2px 8px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 9 }}>POPULAR</span>
                )}
                {p.savings && (
                  <span style={{ background: '#EAF7E9', color: '#5DCC4E', borderRadius: 999, padding: '2px 8px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 9 }}>{p.savings}</span>
                )}
              </div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 12, color: '#9aa3b8', marginTop: 2 }}>{p.perTest}</div>
            </div>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 20, color: '#2D6CDF' }}>₹{p.price}</div>
          </button>
        ))}

        <button
          onClick={handlePay}
          style={{ height: 52, background: '#2D6CDF', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 16, color: '#fff', cursor: 'pointer', width: '100%', boxShadow: '0 4px 24px rgba(45,108,223,0.35)' }}
        >
          Pay ₹{pack.price} →
        </button>
        <div style={{ textAlign: 'center', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 11, color: '#9aa3b8' }}>
          Secured by Razorpay · No auto-renewal
        </div>
      </div>
    </ModalShell>
  );
}

function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(21,35,94,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: '100%', maxWidth: 420, background: '#FBF7EC', borderRadius: '20px 20px 0 0', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 16px 0' }}>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 999, border: '1.5px solid #E7E2D4', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, color: '#5b6784' }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ width: 32, height: 32, borderRadius: 999, border: '3px solid #E7E2D4', borderTopColor: '#2D6CDF', animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
