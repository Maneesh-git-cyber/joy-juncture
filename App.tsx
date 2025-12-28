
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Events from './pages/Events';
import Experiences from './pages/Experiences';
import Community from './pages/Community';
import Wallet from './pages/Wallet';
import Play from './pages/Play';
import About from './pages/About';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
// FIX: Imports from 'react-spring' are now in '@react-spring/web' for v9+
import { animated, useSpring } from '@react-spring/web';

const ThemeBackground: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { theme } = useTheme();
  const lightGradient = 'linear-gradient(to bottom right, #a5f3fc, #f9a8d4)';
  const darkGradient = 'linear-gradient(to bottom right, #4c1d95, #1e293b)';

  const spring = useSpring({
      background: theme === 'light' ? lightGradient : darkGradient,
      config: { duration: 300 }
  });

  return (
    <animated.div style={spring} className="text-jj-gray-900 dark:text-jj-gray-200 min-h-screen flex flex-col font-sans">
        {children}
    </animated.div>
  )
}

const AppContent: React.FC = () => {
    return (
      <HashRouter>
        <ThemeBackground>
          <Header />
          <main className="flex-grow">
            <div className="pt-24 pb-56">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:productId" element={<ProductDetail />} />
                <Route path="/events" element={<Events />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/play" element={<Play />} />
                <Route path="/community" element={<Community />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </ThemeBackground>
      </HashRouter>
  )
}


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WalletProvider>
          <AppContent/>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;