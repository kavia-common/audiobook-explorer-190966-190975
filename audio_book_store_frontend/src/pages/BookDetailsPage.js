import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGet } from '../api/client';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { usePlayer } from '../context/PlayerContext';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();
  const { showToast } = useUser();
  const { load, play, pause, state } = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    apiGet(`/audiobooks/${id}`)
      .then((b) => setBook(b))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  const previewTrack = async (track) => {
    try {
      const preview = await apiGet(`/audiobooks/${id}/preview`);
      load({
        src: preview.url || track.previewUrl,
        title: `${book.title} — ${track.title}`,
        subtitle: book.author,
        cover: book.cover,
        duration: track.duration || 0,
      });
      play();
    } catch (e) {
      // fallback to track previewUrl if available
      load({
        src: track.previewUrl,
        title: `${book?.title || ''} — ${track.title}`,
        subtitle: book?.author || '',
        cover: book?.cover || '',
        duration: track.duration || 0,
      });
      play();
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="surface p-4">
          <div className="skeleton" style={{ height: 280 }} />
          <div className="skeleton mt-3" style={{ height: 18, width: '60%' }} />
          <div className="skeleton mt-2" style={{ height: 14, width: '40%' }} />
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container">
        <div className="surface p-4">Book not found.</div>
      </div>
    );
  }

  const isPlayingThis = state.src && state.title.startsWith(book.title);

  return (
    <div className="container">
      <button className="btn ghost mb-3" onClick={() => navigate(-1)} aria-label="Go back">← Back</button>
      <div className="grid" style={{ gridTemplateColumns: '320px 1fr', gap: 20 }}>
        <div className="surface p-3">
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            width="100%"
            height="420"
            style={{ borderRadius: 12, objectFit: 'cover' }}
          />
        </div>
        <div className="surface p-4">
          <h2 style={{ marginTop: 0 }}>{book.title}</h2>
          <div style={{ color: '#6b7280', marginBottom: 8 }}>{book.author}</div>
          <div className="badge" style={{ marginBottom: 12 }}>{book.category}</div>
          <p style={{ lineHeight: 1.6 }}>{book.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <div style={{ fontWeight: 800, fontSize: 18 }}>${book.price?.toFixed(2)}</div>
            <button
              className="btn"
              onClick={() => { add(book); showToast('Added to cart'); }}
              aria-label={`Add ${book.title} to cart`}
            >
              Add to cart
            </button>
            {isPlayingThis ? (
              <button className="btn ghost" onClick={pause} aria-label="Pause preview">Pause</button>
            ) : (
              <button
                className="btn ghost"
                onClick={() => book.tracks?.[0] && previewTrack(book.tracks[0])}
                aria-label="Play preview"
              >
                Play preview
              </button>
            )}
          </div>

          <h3 className="mt-4">Tracks</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {(book.tracks || []).map((t) => (
              <li key={t.id} className="flex justify-between items-center p-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <strong>{t.title}</strong>
                  <div style={{ color: '#6b7280', fontSize: 12 }}>{Math.round((t.duration || 0) / 60)} min</div>
                </div>
                <button className="btn ghost" onClick={() => previewTrack(t)} aria-label={`Preview ${t.title}`}>
                  Preview
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
