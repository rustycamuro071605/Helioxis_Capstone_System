import { createContext, useContext, useEffect, useState, ReactNode } from 'react';



type Theme = 'sun' | 'moon';



interface ThemeContextType {

  theme: Theme;

  isTransitioning: boolean;

  setTheme: (theme: Theme) => void;

  toggleTheme: () => void;

}



const ThemeContext = createContext<ThemeContextType | undefined>(undefined);



export const useTheme = () => {

  const context = useContext(ThemeContext);

  if (!context) {

    throw new Error('useTheme must be used within a ThemeProvider');

  }

  return context;

};



interface ThemeProviderProps {

  children: ReactNode;

}



export const ThemeProvider = ({ children }: ThemeProviderProps) => {

  const [theme, setTheme] = useState<Theme>('moon');

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [manualThemeSelection, setManualThemeSelection] = useState(false);



  // Get current theme based on time

  const getCurrentTheme = (): Theme => {

    const hour = new Date().getHours();

    // Sun theme: 6am - 5:59pm (6-17)

    // Moon theme: 6pm - 5:59am (18-5)

    // For testing: uncomment the line below to force sun theme

    return 'sun';

    return (hour >= 6 && hour < 18) ? 'sun' : 'moon';

  };



  // Check theme periodically and switch if needed (only if no manual selection)

  useEffect(() => {

    if (manualThemeSelection) return; // Skip auto-update if user manually selected theme

    

    const updateTheme = () => {

      const currentTheme = getCurrentTheme();

      if (currentTheme !== theme) {

        setIsTransitioning(true);

        setTimeout(() => {

          setTheme(currentTheme);

          setIsTransitioning(false);

        }, 300); // Match CSS transition duration

      }

    };



    // Set initial theme

    setTheme(getCurrentTheme());



    // Check every minute for theme changes

    const interval = setInterval(updateTheme, 60000);

    

    // Also check on component mount

    updateTheme();



    return () => clearInterval(interval);

  }, [theme, manualThemeSelection]);



  // Apply theme to document

  useEffect(() => {

    console.log('Setting theme to:', theme);

    document.documentElement.setAttribute('data-theme', theme);

    document.body.className = theme === 'sun' ? 'sun-theme brown-yellow-theme' : 'moon-theme bg-black';

    if (theme === 'sun') {

      document.body.style.background = '#ffffff';

      document.body.style.color = '#000000';

      console.log('Applied clean white sun theme');

    } else {

      document.body.style.background = '';

      document.body.style.color = '';

      console.log('Applied moon theme background');

    }

  }, [theme]);



  const value = {

    theme,

    isTransitioning,

    setTheme: (newTheme: Theme) => {

      setManualThemeSelection(true);

      setIsTransitioning(true);

      setTimeout(() => {

        setTheme(newTheme);

        setIsTransitioning(false);

      }, 300);

    },

    toggleTheme: () => {

      setManualThemeSelection(true);

      const newTheme = theme === 'sun' ? 'moon' : 'sun';

      setIsTransitioning(true);

      setTimeout(() => {

        setTheme(newTheme);

        setIsTransitioning(false);

      }, 300);

    }

  };



  return (

    <ThemeContext.Provider value={value}>

      {children}

    </ThemeContext.Provider>

  );

};