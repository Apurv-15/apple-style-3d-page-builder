import { useEffect, useState } from 'react';
import { blink } from '../lib/blink';
import type { BlinkUser } from '@blinkdotnew/sdk';

// Temporary: Skip authentication for development
const SKIP_AUTH = true;

export function useAuth() {
  const [user, setUser] = useState<BlinkUser | null>(null);
  const [isLoading, setIsLoading] = useState(!SKIP_AUTH);
  const [isAuthenticated, setIsAuthenticated] = useState(SKIP_AUTH);

  useEffect(() => {
    if (SKIP_AUTH) {
      // Bypass auth - simulate logged in state
      setIsLoading(false);
      setIsAuthenticated(true);
      return;
    }

    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setIsLoading(state.isLoading);
      setIsAuthenticated(state.isAuthenticated);
    });
    return unsubscribe;
  }, []);

  const login = (redirectUrl?: string) => blink.auth.login(redirectUrl || window.location.href);
  const logout = () => blink.auth.signOut();

  return { user, isLoading, isAuthenticated, login, logout };
}
