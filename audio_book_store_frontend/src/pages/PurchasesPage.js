import React from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { usePlayer } from '../context/PlayerContext';

const PurchasesPage = () => {
  const { purchases } = useUser();
  const { load, play } = usePlayer();
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="container">
      <h1>Purchases</h1>
      {orderId && <div className="surface p-3 mb-3">Thank you! Order ID: <strong>{orderId}</strong></div>}
      {!purchases.length ? (
        <div className="surface p-4">No purchases yet.</div>
      ) : (
        <div className="grid cards">
          {purchases.map((p) => (
            <div key={p.id} className="surface p-3">
              <img src={p.cover} alt="" width="100%" height="180" style={{ borderRadius: 12, objectFit: 'cover' }} />
              <div className="mt-3">
                <strong>{p.title}</strong>
                <div style={{ color: '#6b7280' }}>{p.author}</div>
                <button
                  className="btn mt-3"
                  onClick={() => {
                    const t = p.tracks?.[0];
                    if (!t) return;
                    load({
                      src: t.previewUrl,
                      title: `${p.title} — ${t.title}`,
                      subtitle: p.author,
                      cover: p.cover,
                      duration: t.duration || 0,
                    });
                    play();
                  }}
                  aria-label={`Play ${p.title}`}
                >
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasesPage;
