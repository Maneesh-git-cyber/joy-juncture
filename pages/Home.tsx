
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { getEvents, getProducts } from '../services/firestoreService';
import { Event, Product } from '../types';
import { motion, useScroll, useTransform } from 'framer-motion';

const expressiveSpring = { type: "spring" as const, stiffness: 200, damping: 30 };

const Home: React.FC = () => {
  const { totalPoints } = useWallet();
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  const bgLayer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgLayer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const bgLayer2X = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);


  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      setUpcomingEvent(allEvents.find(e => !e.isPast) || null);
      
      const allProducts = await getProducts();
      setFeaturedProducts(allProducts.filter(p => ['dead-mans-deck', 'storytellers-saga', 'drama-kings', 'cosmic-colonies'].includes(p.id)));
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-24 md:space-y-32 pb-24 overflow-x-hidden">
      {/* Section 1: Hero Section */}
      <section ref={heroRef} className="relative text-center -mt-24 pt-48 pb-24 overflow-hidden h-[100vh]">
        <motion.div 
          style={{ y: bgLayer1Y }} 
          className="absolute top-0 left-[-20%] w-[140%] h-full bg-gradient-to-r from-jj-sky/20 to-jj-pink/20 dark:from-jj-sky/10 dark:to-jj-pink/10 blur-3xl -z-10" 
        />
        <motion.div 
          style={{ y: bgLayer2Y, x: bgLayer2X }} 
          className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-jj-purple/10 dark:bg-jj-purple/5 rounded-full blur-3xl -z-10" 
        />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.h1 
            style={{ y: textY, scale: textScale, opacity: textOpacity }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-jj-gray-900 dark:text-white">
            Unleash Your Playful Side.
          </motion.h1>
          <motion.p 
            style={{ y: textY, scale: textScale, opacity: textOpacity }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-jj-gray-800 dark:text-jj-gray-200">
            We don’t just make games. We craft experiences that spark laughter, forge connections, and create unforgettable memories.
          </motion.p>
          <motion.div
            style={{ y: textY, scale: textScale, opacity: textOpacity }}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={expressiveSpring}>
                <Link to="/shop" className="w-full sm:w-auto block bg-jj-yellow text-jj-gray-900 font-bold py-3 px-8 rounded-full text-lg">
                Explore Our Games
                </Link>
            </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={expressiveSpring}>
                <Link to="/experiences" className="w-full sm:w-auto block bg-jj-sky text-white font-bold py-3 px-8 rounded-full text-lg">
                Book an Experience
                </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Our Philosophy */}
      <section 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
            <h2 className="text-3xl font-bold text-jj-gray-900 dark:text-white">Built on a Foundation of Joy</h2>
            <p className="mt-2 text-lg text-jj-gray-800 dark:text-jj-gray-300">Our design philosophy is simple:</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <PhilosophyCard title="Connect" description="Our games are engines for interaction, designed to break the ice and build lasting bonds." icon="heart" color="jj-pink" />
          <PhilosophyCard title="Play" description="We champion the pure, unfiltered fun of playfulness. Laughter is always the primary objective." icon="users" color="jj-blue" />
          <PhilosophyCard title="Create" description="Every game is a chance to create a new story, a shared memory, a moment of delight." icon="gift" color="jj-orange" />
        </div>
      </section>

       {/* Section 3: Featured Games */}
       <section className="relative">
        <h2 className="text-3xl font-bold text-center mb-12 text-jj-gray-900 dark:text-white">Featured Games</h2>
        <motion.div 
            drag="x" 
            dragConstraints={{ left: -600, right: 0 }}
            className="flex items-stretch gap-8 px-4 sm:px-6 lg:px-8 cursor-grab active:cursor-grabbing"
        >
          {featuredProducts.map(product => (
            <motion.div
                key={product.id}
                whileHover={{ y: -15, scale: 1.05, transition: expressiveSpring }}
                whileTap={{ scale: 0.95 }}
                className="w-80 flex-shrink-0"
            >
             <Link to={`/shop/${product.id}`} className="group h-full bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">
                <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-jj-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-sm text-jj-gray-800 dark:text-jj-gray-300 mt-1 flex-grow">{product.tagline}</p>
                    <div className="mt-4 flex items-end justify-between">
                        <p className="text-xl font-extrabold text-jj-orange">₹{product.price}</p>
                        <span className="text-sm font-medium text-jj-blue group-hover:underline">View Details &rarr;</span>
                    </div>
                </div>
            </Link>
            </motion.div>
          ))}
          </motion.div>
      </section>


      {/* Section 4: Event Spotlight */}
      {upcomingEvent && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={expressiveSpring}
                className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-white/50 dark:border-white/10"
            >
                <img src={upcomingEvent.imageUrl} alt={upcomingEvent.name} className="w-full md:w-5/12 h-64 md:h-auto object-cover"/>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <p className="font-bold text-jj-red">UPCOMING EVENT</p>
                    <h2 className="text-3xl font-extrabold mt-2 text-jj-gray-900 dark:text-white">{upcomingEvent.name}</h2>
                    <p className="font-semibold text-jj-gray-800 dark:text-jj-gray-200 mt-1">{new Date(upcomingEvent.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} @ {upcomingEvent.location}</p>
                    <p className="text-jj-gray-800 dark:text-jj-gray-300 mt-4">{upcomingEvent.description}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={expressiveSpring} className="mt-6 self-start">
                        <Link to="/events" className="block bg-jj-red text-white font-bold py-3 px-6 rounded-full">
                            Learn More & Register
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
      )}

      {/* Section 5: Community Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-jj-gray-900 dark:text-white">From Our Community</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.img initial={{opacity:0, scale:0.8}} whileInView={{opacity:1, scale:1}} viewport={{once: true}} transition={{...expressiveSpring, delay: 0.1}} src="https://picsum.photos/seed/joy1/500/500" className="rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 hover:rotate-2"/>
                <motion.img initial={{opacity:0, scale:0.8}} whileInView={{opacity:1, scale:1}} viewport={{once: true}} transition={{...expressiveSpring, delay: 0.2}} src="https://picsum.photos/seed/joy2/500/500" className="rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 hover:-rotate-2"/>
                <motion.img initial={{opacity:0, scale:0.8}} whileInView={{opacity:1, scale:1}} viewport={{once: true}} transition={{...expressiveSpring, delay: 0.3}} src="https://picsum.photos/seed/joy3/500/500" className="rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 hover:rotate-2"/>
                <motion.img initial={{opacity:0, scale:0.8}} whileInView={{opacity:1, scale:1}} viewport={{once: true}} transition={{...expressiveSpring, delay: 0.4}} src="https://picsum.photos/seed/joy4/500/500" className="rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 hover:-rotate-2"/>
            </div>
      </section>

      {/* Section 6: Gamification Teaser */}
      <section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/60 dark:bg-jj-gray-800/60 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center border border-white/50 dark:border-white/10">
            <div className="w-full md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-jj-gray-900 dark:text-white">The Joy Engine</h2>
                <p className="mt-4 text-lg text-jj-gray-900 dark:text-jj-gray-200">Your engagement is our currency. Earn Joy Points with every game purchase, event you attend, and online puzzle you solve. Redeem them for exclusive rewards, discounts, and bragging rights!</p>
                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={expressiveSpring} className="mt-6 inline-block">
                    <Link to="/wallet" className="block bg-jj-purple text-white font-bold py-3 px-6 rounded-full">
                        Discover Your Wallet &rarr;
                    </Link>
                </motion.div>
            </div>
            <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
                <div className="bg-white dark:bg-jj-gray-900 p-6 rounded-3xl shadow-lg w-full max-w-sm">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-jj-gray-900 dark:text-white">Your Wallet</h4>
                        <span className="text-xs font-semibold text-jj-purple bg-jj-purple/10 px-2 py-1 rounded-full">PREVIEW</span>
                    </div>
                    <div className="text-center my-4">
                        <p className="text-4xl font-bold text-jj-purple">{totalPoints}</p>
                        <p className="text-sm text-jj-gray-500 dark:text-jj-gray-400">Joy Points</p>
                    </div>
                    <div className="text-xs text-jj-gray-500 dark:text-jj-gray-400 space-y-1">
                        <p><span className="font-semibold text-green-500">+100</span> for Sign Up</p>
                        <p><span className="font-semibold text-green-500">+250</span> for Mehfil Purchase</p>
                        <p><span className="font-semibold text-green-500">+50</span> for Game Night Attendance</p>
                         <p><span className="font-semibold text-green-500">+25</span> for Solving Sudoku</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

const ICONS: { [key: string]: React.ReactNode } = {
  home: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  users: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  gift: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
  heart: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
};

const philosophyCardStyles: { [key: string]: string } = {
  'jj-blue': 'text-jj-blue',
  'jj-pink': 'text-jj-pink',
  'jj-orange': 'text-jj-orange',
};

const PhilosophyCard: React.FC<{ title: string; description: string; icon: string; color: string }> = ({ title, description, icon, color }) => {
  const colorClass = philosophyCardStyles[color] || 'text-jj-gray-900';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={expressiveSpring}
      className="p-8 rounded-3xl bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl shadow-lg text-center"
    >
      <div className={`${colorClass} inline-block mb-4`}>
          {ICONS[icon]}
      </div>
      <h3 className="text-xl font-bold text-jj-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-jj-gray-900 dark:text-jj-gray-300">{description}</p>
    </motion.div>
  );
};


export default Home;