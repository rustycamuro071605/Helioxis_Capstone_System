import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme, isTransitioning, toggleTheme } = useTheme();
  const [transitionActive, setTransitionActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Check if we're on login/register pages to hide theme indicator
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isLoginPage = currentPath.includes('/login');
  const isRegisterPage = currentPath.includes('/register');
  const shouldShowIndicator = !(isLoginPage || isRegisterPage);

  useEffect(() => {
    if (isTransitioning) {
      setTransitionActive(true);
      const timer = setTimeout(() => {
        setTransitionActive(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Handle scroll to show/hide theme indicator
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px threshold
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'sun' ? 'sun-theme' : 'moon-theme';
  }, [theme]);

  return (
    <>
      {/* Theme transition overlay */}
      <div 
        className={`theme-transition-overlay ${transitionActive ? 'active' : ''}`}
      />
      
      {/* Floating theme indicator - Positioned at the very top level to ensure visibility */}
      {shouldShowIndicator && (
      <div className={`fixed top-4 right-4 z-[100] pointer-events-auto transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div 
          className={`
          p-4 rounded-full backdrop-blur-lg shadow-lg
          ${theme === 'sun' 
            ? 'bg-gradient-to-br from-amber-800/30 to-yellow-600/40 border border-amber-700/50 text-amber-100' 
            : 'bg-gradient-to-br from-indigo-500/20 to-blue-600/30 border border-indigo-400/40 text-indigo-200'}
          transition-all duration-500
        `}
        title={theme === 'sun' ? 'Sun Theme Active' : 'Moon Theme Active'}>
          {theme === 'sun' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin-slow">
              <circle cx="12" cy="12" r="5" className="text-yellow-300" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" className="text-amber-400" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" className="text-indigo-300" />
            </svg>
          )}
        </div>
      </div>
      )}

      {/* Theme particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1 rounded-full opacity-20
              ${theme === 'sun' 
                ? 'bg-orange-400 animate-pulse' 
                : 'bg-blue-400 animate-pulse'
              }
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {children}
    </>
  );
};