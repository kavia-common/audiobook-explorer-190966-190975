import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';

const Toast = () => {
  const { toast } = useUser();
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (toast) {
      setMsg(toast);
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  if (!visible) return null;
  return (
    <div role="status" aria-live="polite" className="toast">
      {msg}
    </div>
  );
};

export default Toast;
