import React, { createContext, useContext, useReducer } from 'react';

const PlayerContext = createContext(null);

const initial = {
  src: '',
  title: '',
  subtitle: '',
  cover: '',
  duration: 0,
  position: 0,
  playing: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, ...action.payload, playing: false, position: 0 };
    case 'PLAY':
      return { ...state, playing: true };
    case 'PAUSE':
      return { ...state, playing: false };
    case 'SEEK':
      return { ...state, position: action.position };
    case 'DURATION':
      return { ...state, duration: action.duration };
    default:
      return state;
  }
}

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  // PUBLIC_INTERFACE
  const load = (info) => dispatch({ type: 'LOAD', payload: info });
  // PUBLIC_INTERFACE
  const play = () => dispatch({ type: 'PLAY' });
  // PUBLIC_INTERFACE
  const pause = () => dispatch({ type: 'PAUSE' });
  // PUBLIC_INTERFACE
  const seek = (position) => dispatch({ type: 'SEEK', position });
  // PUBLIC_INTERFACE
  const setDuration = (duration) => dispatch({ type: 'DURATION', duration });

  const value = { state, load, play, pause, seek, setDuration };
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

// PUBLIC_INTERFACE
export const usePlayer = () => {
  /** Hook to access player state and actions. */
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};
