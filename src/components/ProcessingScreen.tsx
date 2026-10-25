import { D, U } from '@/lib/ui';
import Koo from './Koo';

export default function ProcessingScreen() {
  return (
    <div role="status" style={{ minHeight: '100vh', background: '#FBF7EC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <Koo state="thinking" size={160} style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ fontFamily: D, fontWeight: 800, fontSize: 26 }}>Verifying payment…</div>
      <div style={{ fontFamily: U, fontWeight: 600, fontSize: 14, color: '#5b6784' }}>This takes just a moment</div>
      <div style={{ width: 44, height: 44, border: '4px solid #E7E2D4', borderTopColor: '#2D6CDF', borderRadius: 999, animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
}
