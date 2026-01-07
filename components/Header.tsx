import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, Transition, LayoutGroup } from 'framer-motion';

// --- TYPESCRIPT FIXES & CONFIGURATION ---

const MotionSpan = motion.span as any;
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

// A "Heavy" Spring - No bounce, just a smooth, magnetic glide.
const smoothSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  mass: 0.8,
};

const NavItem: React.FC<{ to: string; children: React.ReactNode; isScrolled: boolean }> = ({ to, children, isScrolled }) => {
  const activeColor = '#a357daff';
  
  // Text size transition
  const baseClasses = `relative transition-colors duration-300 font-medium tracking-wide outline-none`;
  
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
        <motion.div 
          className={`flex items-center justify-center rounded-full transition-all duration-500 ${isScrolled ? 'px-3 py-1.5' : 'px-6 py-2'}`}
          layout 
          transition={smoothSpring}
        >
          <MotionSpan 
            layout 
            className={isScrolled ? 'text-sm font-medium' : 'text-lg font-bold'}
            transition={smoothSpring}
          >
            {children}
          </MotionSpan>
          
          {isActive && (
            <MotionDiv
              className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full"
              style={{ backgroundColor: activeColor }}
              layoutId="active-pill-underline"
              transition={smoothSpring}
            />
          )}
        </motion.div>
      )}
    </NavLink>
  );
};

const Header: React.FC = () => {
  const { user, loading } = useAuth();
  const { totalPoints } = useWallet();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LayoutGroup>
      <motion.header 
        className="fixed z-50 top-0 left-0 right-0 pointer-events-none flex justify-center"
        transition={smoothSpring}
      >
        
        <motion.div 
          layout
          transition={smoothSpring}
          initial={{ width: "100%" }}
          animate={{ 
            width: isScrolled ? "auto" : "100%",
            gap: isScrolled ? "1rem" : "0rem"
          }}
          className={`flex items-center pointer-events-auto ${isScrolled ? 'justify-center mt-4' : 'justify-between px-10 pt-10'}`}
        >

          <motion.div 
            layout
            transition={smoothSpring}
            animate={isScrolled ? {
              backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.6)" : "rgba(20, 20, 20, 0.6)",
              backdropFilter: "blur(40px) saturate(180%)",
              borderRadius: "9999px",
              padding: "0.75rem 1.5rem",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.2)"
            } : {
              backgroundColor: "rgba(0,0,0,0)",
              backdropFilter: "blur(0px)",
              borderRadius: "0px",
              padding: "0",
              boxShadow: "none",
              border: "1px solid rgba(0,0,0,0)"
            }}
            className="flex items-center justify-center"
          >
            <Link to="/" className="outline-none">
              <MotionSpan 
                layout 
                className={`font-extrabold tracking-tight block ${isScrolled ? 'text-lg' : 'text-4xl'} text-jj-gray-900 dark:text-white`}
                transition={smoothSpring}
              >
                Joy Juncture
              </MotionSpan>
            </Link>
          </motion.div>

          <motion.div 
            layout
            transition={smoothSpring}
            animate={isScrolled ? {
              backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.6)" : "rgba(20, 20, 20, 0.6)",
              backdropFilter: "blur(40px) saturate(180%)",
              borderRadius: "9999px",
              padding: "0.5rem 1rem",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.2)"
            } : {
              backgroundColor: "rgba(0,0,0,0)",
              backdropFilter: "blur(0px)",
              borderRadius: "0px",
              padding: "0",
              boxShadow: "none",
              border: "1px solid rgba(0,0,0,0)"
            }}
            className="hidden md:flex items-center justify-center"
          >
            <NavItem isScrolled={isScrolled} to="/">Home</NavItem>
            <NavItem isScrolled={isScrolled} to="/shop">Shop</NavItem>
            <NavItem isScrolled={isScrolled} to="/experiences">Experience</NavItem>
            <NavItem isScrolled={isScrolled} to="/events">Events</NavItem>
            <NavItem isScrolled={isScrolled} to="/play">Play</NavItem>
            <NavItem isScrolled={isScrolled} to="/community">Social</NavItem>
            <NavItem isScrolled={isScrolled} to="/about">About</NavItem>
          </motion.div>

          <motion.div 
            layout 
            transition={smoothSpring} 
            animate={{ 
              gap: isScrolled ? "1rem" : "0.75rem" 
            }}
            className="flex items-center"
          >
            
            <motion.div 
              layout
              transition={smoothSpring}
              animate={isScrolled ? {
                backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.6)" : "rgba(20, 20, 20, 0.6)",
                backdropFilter: "blur(40px) saturate(180%)",
                borderRadius: "9999px",
                padding: "0.5rem",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)"
              } : {
                backgroundColor: "rgba(0,0,0,0)",
                backdropFilter: "blur(0px)",
                borderRadius: "0px",
                padding: "0",
                boxShadow: "none",
                border: "1px solid rgba(0,0,0,0)"
              }}
              className="flex items-center justify-center"
            >
               <MotionButton
                  layout
                  onClick={() => toggleTheme()}
                  className={`flex items-center justify-center rounded-full outline-none transition-colors
                    ${isScrolled 
                      ? 'w-10 h-10 text-jj-gray-700 dark:text-jj-yellow hover:bg-black/5 dark:hover:bg-white/10' 
                      : 'w-14 h-14 text-jj-gray-700 dark:text-jj-yellow hover:bg-black/5 dark:hover:bg-white/10'
                    }
                  `}
                  transition={smoothSpring}
                >
                  {theme === 'light' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm-.707-10.607a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" /></svg>
                  )}
              </MotionButton>
            </motion.div>

            <motion.div 
              layout
              transition={smoothSpring}
              animate={user && isScrolled ? {
                backgroundColor: theme === 'light' ? "rgba(255, 255, 255, 0.6)" : "rgba(20, 20, 20, 0.6)",
                backdropFilter: "blur(40px) saturate(180%)",
                borderRadius: "9999px",
                padding: "0.5rem 1rem",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)"
              } : {
                backgroundColor: "rgba(0,0,0,0)",
                backdropFilter: "blur(0px)",
                borderRadius: "0px",
                padding: "0",
                boxShadow: "none",
                border: "1px solid rgba(0,0,0,0)"
              }}
              className="flex items-center justify-center"
            >
              {loading ? (
                <div className="w-10 h-10 bg-gray-300 dark:bg-jj-gray-600 rounded-full animate-pulse mx-2" />
              ) : user ? (
                <motion.div 
                  layout 
                  className="flex items-center gap-3"
                >
                  <Link to="/wallet" className="flex items-center gap-3">
                    <span className="text-sm font-bold text-jj-purple">{totalPoints}</span>
                    <img src={user.avatarUrl} alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-600" />
                  </Link>
                </motion.div>
              ) : (
                <Link to="/login" className="outline-none">
                  <MotionButton
                    layout
                    transition={smoothSpring}
                    // FIXED: Always Blue (bg-jj-sky), Always White text, No Borders.
                    className={`flex items-center justify-center font-bold tracking-wide rounded-full text-white bg-jj-sky hover:bg-jj-blue shadow-lg shadow-jj-sky/20 outline-none border-none ring-0
                      ${isScrolled 
                        ? 'px-5 h-10 text-xs' // Compact Blue Pill
                        : 'px-10 h-14 text-lg'    // Large Blue Pill
                      }
                    `}
                  >
                    <MotionSpan layout transition={smoothSpring}>Login</MotionSpan>
                  </MotionButton>
                </Link>
              )}
            </motion.div>

          </motion.div>

        </motion.div>
      </motion.header>
    </LayoutGroup>
  );
};

export default Header;