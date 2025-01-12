import { useCookies } from 'react-cookie';

interface UseAuthCookiesReturn {
  token: string | null;
  userId: string | null;
  setAuthCookies: (token: string, userId: string) => void;
  clearAuthCookies: () => void;
  isAuthenticated: boolean;
}

export const useAuthCookies = (): UseAuthCookiesReturn => {
  const [cookies, setCookie, removeCookie] = useCookies(['UserToken', 'UserId']);

  // Set both authentication cookies
  const setAuthCookies = (token: string, userId: string) => {
    console.log(userId)
    // Set cookies with secure options
    const cookieOptions = {
      path: '/',
      secure: true,
      sameSite: true,
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    };

    setCookie('UserToken',"Bearer " + token, cookieOptions);
    setCookie('UserId', userId, cookieOptions);
  };

  // Clear both authentication cookies
  const clearAuthCookies = () => {
    removeCookie('UserToken', { path: '/' });
    removeCookie('UserId', { path: '/' });
  };

  return {
    token: cookies.UserToken || null,
    userId: cookies.UserId || null,
    setAuthCookies,
    clearAuthCookies,
    isAuthenticated: Boolean(cookies.UserToken && cookies.UserId)
  };
};