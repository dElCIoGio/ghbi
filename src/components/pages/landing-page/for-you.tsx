import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BlackWomanBeigeBackground,
} from '../../../assets';

const cards = [
  {
    label: 'Radiant Glow',
    stats: null,
  },
  {
    label: 'Natural Beauty',
    stats: null,
  },
  {
    label: 'ROWSE',
    stats: {
      title: 'ROWSE',
      items: [
        { percent: '96%', desc: 'SAW MORE LIFTED SKIN IN JUST 1 WEEK' },
        { percent: '100%', desc: 'SAW MORE SCULPTED FACIAL FEATURES IN 1 WEEK' },
        { percent: '92%', desc: 'SAW IMMEDIATE IMPROVEMENT OF FINE LINES AND WRINKLES' },
      ],
      product: BlackWomanBeigeBackground,
    },
  },
  {
    label: 'In the Wild',
    stats: null,
  },
];

function ForYou() {
  const [index, setIndex] = useState(2); // Center card is the main one

  const handlePrev = () => setIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

  return (
    <div style={{
      width: '100%',
      minHeight: '60vh',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
      position: 'relative',
    }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 32, letterSpacing: -1, textAlign: 'center' }}>For You</h2>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: 900,
        minHeight: 400,
        margin: '0 auto',
      }}>
        {/* Carousel Cards */}
        {cards.map((card, i) => {
          const offset = i - index;
          const isActive = i === index;
          const zIndex = 10 - Math.abs(offset);
          const scale = isActive ? 1 : 0.85;
          const opacity = Math.abs(offset) > 2 ? 0 : 1;
          const x = offset * 120;
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                transform: `translateX(-50%)`,
                zIndex,
                width: isActive ? 340 : 260,
                height: isActive ? 420 : 340,
                borderRadius: 32,
                overflow: 'hidden',
                boxShadow: isActive ? '0 8px 32px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.08)',
                opacity,
                cursor: isActive ? 'default' : 'pointer',
                transition: 'box-shadow 0.3s',
                background: '#f5f5f5',
                display: opacity === 0 ? 'none' : 'block',
              }}
              animate={{
                x,
                scale,
                opacity,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={() => !isActive && setIndex(i)}
            >
              {/* Card Label */}
              <div style={{
                padding: isActive ? '18px 24px' : '12px 18px',
                color: '#222',
                fontWeight: 600,
                fontSize: isActive ? 20 : 16,
                letterSpacing: 0.5,
                textAlign: 'left',
                background: '#ffffff',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                zIndex: 2,
              }}>{card.label}</div>
              
              {/* Stats for main card */}
              {isActive && card.stats && (
                <div style={{
                  width: '100%',
                  height: 'calc(100% - 60px)',
                  color: '#222',
                  background: '#ffffff',
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}>
                  <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{card.stats.title}</div>
                  <div style={{ marginBottom: 18 }}>
                    {card.stats.items.map((item, idx) => (
                      <div key={idx} style={{ fontSize: 14, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 16 }}>{item.percent}</span> <span style={{ fontWeight: 400 }}>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ position: 'absolute', bottom: 24, right: 24, width: 60, height: 60, borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
                    <img src={card.stats.product} alt="product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      {/* Carousel Controls */}
      <div style={{ display: 'flex', gap: 16, marginTop: 32, alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={handlePrev} style={{
          width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#d1c7be', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>&lt;</button>
        <div style={{ display: 'flex', gap: 8 }}>
          {cards.map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%', background: i === index ? '#222' : '#bdbdbd', transition: 'background 0.2s',
            }} />
          ))}
        </div>
        <button onClick={handleNext} style={{
          width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#d1c7be', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>&gt;</button>
      </div>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 700px) {
          h2 { font-size: 2rem !important; }
          div[style*='max-width: 900px'] > div {
            width: 180px !important;
            height: 210px !important;
          }
          div[style*='max-width: 900px'] {
            min-height: 220px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ForYou;