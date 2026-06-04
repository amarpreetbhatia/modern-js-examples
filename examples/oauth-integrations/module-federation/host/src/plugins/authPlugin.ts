export type AuthSession = {
  authenticated: boolean;
  token?: string;
  user?: {
    login?: string;
    name?: string;
    avatar_url?: string;
  };
} | null;

export function authPlugin() {
  const startLogin = () => {
    window.location.href = '/api/auth/login';
  };

  const fetchSession = async (): Promise<AuthSession> => {
    try {
      const res = await fetch('/api/session');
      if (!res.ok) {
        return null;
      }
      const json = await res.json();
      return json;
    } catch (error) {
      console.warn('Failed to fetch auth session', error);
      return null;
    }
  };

  return {
    startLogin,
    fetchSession,
  };
}
