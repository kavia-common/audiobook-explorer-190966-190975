import React, { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';

const formatTime = (sec = 0) => {
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  const m = Math.floor((sec / 60) % 60).toString().padStart(2, '0');
  const h = Math.floor(sec / 3600);
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
};

const MiniPlayer = () => {
  const { state, pause, play, seek } = usePlayer();
  const audioRef = useRef(null);
  const [localPos, setLocalPos] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (state.playing && state.src) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [state.playing, state.src]);

  useEffect(() => {
    setLocalPos(state.position);
  }, [state.position]);

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    seek(audio.currentTime);
  };

  if (!state.src) return null;

  return (
    <div className="mini-player">
      <div className="container flex items-center justify-between p-3">
        <div className="flex items-center gap-3" style={{ minWidth: 0 }}>
          <img src={state.cover} alt="" width="44" height="44" style={{ borderRadius: 8, objectFit: 'cover' }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{state.title}</div>
            <div style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{state.subtitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-3" aria-label="Playback controls">
          <button
            className="btn"
            aria-label={state.playing ? 'Pause' : 'Play'}
            onClick={() => (state.playing ? pause() : play())}
          >
            {state.playing ? 'Pause' : 'Play'}
          </button>
          <div className="flex items-center gap-2" style={{ width: 320 }}>
            <small aria-label="Current time">{formatTime(localPos)}</small>
            <input
              aria-label="Seek slider"
              type="range"
              min="0"
              max={Math.max(1, Math.floor(state.duration))}
              value={Math.floor(localPos)}
              onChange={(e) => setLocalPos(Number(e.target.value))}
              onMouseUp={(e) => seek(Number(e.target.value))}
              onKeyUp={(e) => seek(Number(e.target.value))}
              className="w-full"
            />
            <small aria-label="Track duration">{formatTime(state.duration)}</small>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={state.src || undefined}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={(e) => seek(e.currentTarget.currentTime)}
        onEnded={pause}
        preload="metadata"
      />
    </div>
  );
};

export default MiniPlayer;
