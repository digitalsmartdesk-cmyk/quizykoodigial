import { FAQ } from '@/data/faq';

export default function FaqGrid() {
  return (
    <div className="faq-grid">
      {FAQ.map(f => (
        <div key={f.q} style={{ background: '#FBF7EC', border: '1.5px solid #E7E2D4', borderRadius: 14, padding: '20px 22px' }}>
          <h3 style={{ margin: '0 0 8px', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 14, color: '#15235E' }}>{f.q}</h3>
          <p style={{ margin: 0, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 13, color: '#5b6784', lineHeight: 1.65 }}>{f.a}</p>
        </div>
      ))}
    </div>
  );
}
