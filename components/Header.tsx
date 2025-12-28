
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { animated, useSpring } from '@react-spring/web';

// Custom hook to track the previous value of a prop or state.
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const expressiveSpring = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
  mass: 0.8,
};

const underlineSpring = {
  type: "spring" as const,
  stiffness: 140, // Still fluid, but responsive
  damping: 18,    // Very bouncy and energetic settle
  mass: 2.0,      // Give it its own weight and inertia
};

// A very stiff spring for an almost-instant transition, to lock the underline to the text during scroll.
const rigidSpring = { type: "spring" as const, stiffness: 1000, damping: 50 };


const NavItem: React.FC<{ to: string; children: React.ReactNode; isCompact?: boolean }> = ({ to, children, isCompact = false }) => {
  const activeColor = '#a357daff';
  const baseClasses = isCompact
    ? 'relative transition-colors duration-200 px-3 py-2 text-sm font-medium'
    : 'relative transition-colors duration-200 px-4 py-2 text-base font-medium';
  
  const prevIsCompact = usePrevious(isCompact);
  // A scroll transition is happening if isCompact has changed since the last render.
  const isScrollTransition = prevIsCompact !== undefined && prevIsCompact !== isCompact;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClasses} ${
          isActive
            ? 'text-jj-gray-900 dark:text-white'
            : 'text-jj-gray-900 dark:text-jj-gray-300 hover:text-jj-gray-900 dark:hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <motion.span whileHover={{ scale: 1.05 }} transition={expressiveSpring}>
            {children}
          </motion.span>
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
              style={{ 
                backgroundColor: activeColor, 
                boxShadow: `0 0 15px 3px ${activeColor}`,
                originX: 0.5 
              }}
              layoutId="active-pill-underline"
              transition={isScrollTransition ? rigidSpring : underlineSpring}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

const Header: React.FC = () => {
  const { user, login, logout, loading } = useAuth();
  const { totalPoints } = useWallet();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // This spring controls the jiggle of the ENTIRE PILL as a single unit.
  // It animates the transform property (translateY) for a vertical bounce.
  const [jiggleProps, api] = useSpring(() => ({
    transform: 'translateY(0px)',
    config: { mass: 2.5, tension: 200, friction: 10 }, // Extreme Jiggle Physics
  }));

  useEffect(() => {
    api.start({
      transform: isScrolled ? 'translateY(16px)' : 'translateY(0px)',
    });
  }, [isScrolled, api]);

  const scrolledClasses = `
    w-full max-w-4xl 
    bg-gradient-to-b from-white/50 to-white/30 dark:from-jj-gray-700/50 dark:to-jj-gray-800/60
    backdrop-blur-5xl backdrop-saturate-150 rounded-full 
    py-[10px] px-6 border border-white/60 dark:border-white/20
    shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]
    dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]
  `;
  const normalClasses = `
    w-full max-w-7xl bg-transparent dark:bg-transparent 
    backdrop-blur-0 shadow-none rounded-none py-6 px-10 border border-transparent
  `;

  return (
    <header className="fixed z-50 top-0 left-0 right-0">
      <animated.div style={jiggleProps} className="flex justify-center">
        <nav className={`grid items-center grid-cols-[auto_1fr_auto] gap-x-6 transition-all duration-500 ease-in-out ${isScrolled ? scrolledClasses : normalClasses}`}>
            <div className="flex justify-start">
                <Link
                    to="/"
                    className={`font-bold text-jj-gray-900 dark:text-white shrink-0 transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}
                >
                    Joy Juncture
                </Link>
            </div>

            <div className="hidden md:flex items-center justify-evenly">
                <NavItem to="/" isCompact={isScrolled}>Home</NavItem>
                <NavItem to="/shop" isCompact={isScrolled}>Shop</NavItem>
                <NavItem to="/experiences" isCompact={isScrolled}>Experiences</NavItem>
                <NavItem to="/events" isCompact={isScrolled}>Events</NavItem>
                <NavItem to="/play" isCompact={isScrolled}>Play</NavItem>
                <NavItem to="/community" isCompact={isScrolled}>Community</NavItem>
                <NavItem to="/about" isCompact={isScrolled}>About Us</NavItem>
            </div>

            <div className="flex justify-end">
                <div className="flex items-center gap-3">
                    <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleTheme()}
                    className={`rounded-full hover:bg-jj-gray-100 dark:hover:bg-jj-gray-700 transition-colors ${isScrolled ? 'p-2' : 'p-2'}`}
                    >
                    {theme === 'light' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className={`${isScrolled ? 'h-5 w-5' : 'h-6 w-6'} text-jj-gray-900`} viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className={`${isScrolled ? 'h-5 w-5' : 'h-6 w-6'} text-jj-yellow`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm-.707-10.607a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" /></svg>
                    )}
                    </motion.button>

                    {loading ? (
                    <div className={`${isScrolled ? 'h-7 w-14' : 'h-8 w-16'} bg-gray-200 dark:bg-jj-gray-700 rounded-full animate-pulse`} />
                    ) : user ? (
                    <div className="flex items-center gap-3">
                        <Link to="/wallet" className={`flex items-center gap-2 ${isScrolled ? 'text-sm' : 'text-sm font-medium'} text-jj-purple hover:text-jj-sky`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M10 20a8 8 0 110-16 8 8 0 010 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V9z" /></svg>
                        <span className="font-bold">{totalPoints}</span>
                        </Link>
                        <img src={user.avatarUrl} alt={user.name} className={`${isScrolled ? 'h-7 w-7' : 'h-9 w-9'} rounded-full`} />
                        <button onClick={logout} className={`hidden md:block ${isScrolled ? 'text-sm' : 'text-sm font-medium'} text-jj-gray-900 dark:text-jj-gray-200 hover:text-jj-red`}>
                        Logout
                        </button>
                    </div>
                    ) : (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={expressiveSpring}
                        onClick={login}
                        className={`bg-jj-sky text-white rounded-full hover:bg-opacity-90 transition-colors font-semibold ${isScrolled ? 'px-4 py-2 text-sm' : 'px-4 py-2 text-base'}`}
                    >
                        Login
                    </motion.button>
                    )}
                </div>
            </div>
        </nav>
      </animated.div>
    </header>
  );
};

export default Header;