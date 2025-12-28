
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const { scrollYProgress: timelineProgress } = useScroll();
  const sectionRef = useRef(null);
  const { scrollYProgress: imageProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(imageProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div>
      <section className="py-20 bg-white/20 dark:bg-jj-gray-800/20 backdrop-blur-sm">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-jj-orange">Our Core Belief</h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-jj-gray-900 dark:text-jj-gray-200 leading-relaxed">
            At Joy Juncture, we believe games are powerful tools for bonding. They're not just about winning or losing; they're about creating shared moments, sparking laughter, and building connections that last a lifetime. Our mission is to be the architects of joy, crafting experiences that bring people together, one game at a time.
          </p>
        </motion.div>
      </section>

      <section ref={sectionRef} className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <motion.div 
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="relative h-96">
                <motion.img 
                  style={{ y: imageY }}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl transform rotate-3" src="https://picsum.photos/seed/founder/600/800" alt="Founder of Joy Juncture" 
                />
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="mt-12 lg:mt-0">
              <h2 className="text-3xl font-extrabold text-jj-gray-900 dark:text-white">A Journey Fueled by Joy</h2>
              <p className="mt-4 text-lg text-jj-gray-900 dark:text-jj-gray-300">
                Joy Juncture started not in a boardroom, but around a lively dining table cluttered with game boards and half-empty snack bowls. Our founder, an avid gamer and professional facilitator, grew up in a family where game nights were sacred. It was a time for storytelling, friendly competition, and unfiltered joy.
              </p>
              <p className="mt-4 text-lg text-jj-gray-900 dark:text-jj-gray-300">
                After years observing the stilted interactions of the corporate world, they realized something vital was missing: the genuine, playful connection that games so effortlessly create. Joy Juncture was born from a simple desire to bottle that magic and share it with the world, transforming sterile events into vibrant, memorable experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-jj-gray-900 dark:text-white">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white/50 dark:bg-jj-gray-800/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg">
                    <h3 className="text-2xl font-bold text-jj-red">Fun First</h3>
                    <p className="mt-2 text-jj-gray-800 dark:text-jj-gray-300">We are relentless in our pursuit of fun. Every game we design, every event we host, is built on a foundation of playfulness, laughter, and lighthearted competition.</p>
                </div>
                <div className="bg-white/50 dark:bg-jj-gray-800/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg">
                    <h3 className="text-2xl font-bold text-jj-blue">Connection is Key</h3>
                    <p className="mt-2 text-jj-gray-800 dark:text-jj-gray-300">We believe games are a means to an end: genuine human connection. Our experiences are crafted to break down barriers, spark conversations, and build community.</p>
                </div>
                 <div className="bg-white/50 dark:bg-jj-gray-800/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg">
                    <h3 className="text-2xl font-bold text-jj-purple">Quality in Craft</h3>
                    <p className="mt-2 text-jj-gray-800 dark:text-jj-gray-300">From the artwork on our cards to the facilitation of our workshops, we are obsessed with quality. We deliver polished, thoughtful, and memorable experiences, every time.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="bg-jj-blue/80 dark:bg-indigo-800/80 text-white py-20">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="relative">
                <motion.div 
                  className="absolute left-1/2 w-1 bg-jj-yellow/50 transform -translate-x-1/2 origin-top h-full"
                  style={{ scaleY: timelineProgress }}
                  aria-hidden="true" 
                />
                <div className="space-y-16">
                    {/* Timeline Item 1 */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center w-full">
                        <div className="w-1/2 flex justify-end">
                            <div className="w-full max-w-sm bg-white/80 dark:bg-jj-gray-800/80 backdrop-blur-lg text-jj-gray-900 dark:text-white p-6 rounded-3xl shadow-lg mr-8">
                                <h3 className="font-bold">The Spark (2021)</h3>
                                <p className="text-sm mt-1">The first prototype for 'Dead Man's Deck' is created on a rainy weekend, fueled by pizza and a desire for a better pirate game.</p>
                            </div>
                        </div>
                         <div className="w-10 h-10 bg-jj-yellow rounded-full z-10 flex items-center justify-center font-bold text-jj-gray-900 ring-4 ring-white/50">1</div>
                         <div className="w-1/2"></div>
                    </motion.div>
                    {/* Timeline Item 2 */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center w-full">
                        <div className="w-1/2"></div>
                         <div className="w-10 h-10 bg-jj-yellow rounded-full z-10 flex items-center justify-center font-bold text-jj-gray-900 ring-4 ring-white/50">2</div>
                        <div className="w-1/2 flex justify-start">
                            <div className="w-full max-w-sm bg-white/80 dark:bg-jj-gray-800/80 backdrop-blur-lg text-jj-gray-900 dark:text-white p-6 rounded-3xl shadow-lg ml-8">
                                <h3 className="font-bold">First Event (2022)</h3>
                                <p className="text-sm mt-1">Hosted our first public game night in a local cafe. 12 people showed up. It was chaotic, loud, and an absolute blast!</p>
                            </div>
                        </div>
                    </motion.div>
                     {/* Timeline Item 3 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center w-full">
                        <div className="w-1/2 flex justify-end">
                            <div className="w-full max-w-sm bg-white/80 dark:bg-jj-gray-800/80 backdrop-blur-lg text-jj-gray-900 dark:text-white p-6 rounded-3xl shadow-lg mr-8">
                                <h3 className="font-bold">Going Pro (2023)</h3>
                                <p className="text-sm mt-1">Our first corporate client hires us for a team-building workshop. We realize this is more than just a passion project.</p>
                            </div>
                        </div>
                         <div className="w-10 h-10 bg-jj-yellow rounded-full z-10 flex items-center justify-center font-bold text-jj-gray-900 ring-4 ring-white/50">3</div>
                         <div className="w-1/2"></div>
                    </motion.div>
                     {/* Timeline Item 4 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center w-full">
                        <div className="w-1/2"></div>
                         <div className="w-10 h-10 bg-jj-yellow rounded-full z-10 flex items-center justify-center font-bold text-jj-gray-900 ring-4 ring-white/50">4</div>
                        <div className="w-1/2 flex justify-start">
                             <div className="w-full max-w-sm bg-white/80 dark:bg-jj-gray-800/80 backdrop-blur-lg text-jj-gray-900 dark:text-white p-6 rounded-3xl shadow-lg ml-8">
                                <h3 className="font-bold">Today</h3>
                                <p className="text-sm mt-1">With a growing library of games and a community of thousands, we're just getting started on our mission to spread joy.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;