
import React, { useState, useEffect, useMemo } from 'react';
import { Event } from '../types';
import { useWallet } from '../contexts/WalletContext';
import { getEvents } from '../services/firestoreService';
// FIX: Imports from 'react-spring' are now in '@react-spring/web' for v9+
import { animated, useTrail } from '@react-spring/web';
import { motion } from 'framer-motion';

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const { addPoints } = useWallet();
  const randomColor = useMemo(() => (Math.random() > 0.5 ? 'text-jj-sky' : 'text-jj-pink'), []);
  const randomButtonColor = useMemo(() => (Math.random() > 0.5 ? 'bg-jj-sky' : 'bg-jj-pink'), []);

  const handleRegister = async () => {
    // Mock registration
    const pointsEarned = 50;
    await addPoints(`Registered for: ${event.name}`, pointsEarned);
    alert(`You're registered for ${event.name}! You've earned ${pointsEarned} Joy Points!`);
  };

  return (
    <motion.div 
        whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
        className="bg-white/50 dark:bg-jj-gray-800/50 backdrop-blur-2xl rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-white/50 dark:border-white/10"
    >
      <img src={event.imageUrl} alt={event.name} className="w-full md:w-1/3 h-64 md:h-auto object-cover" />
      <div className="p-6 flex flex-col justify-between">
        <div>
          <p className={`text-sm font-bold uppercase tracking-wider ${event.isPast ? 'text-jj-gray-500 dark:text-jj-gray-400' : randomColor}`}>
            {event.isPast ? 'Past Event' : 'Upcoming Event'}
          </p>
          <h3 className="text-2xl font-bold mt-2 text-jj-gray-900 dark:text-white">{event.name}</h3>
          <p className="font-semibold text-jj-gray-800 dark:text-jj-gray-200 mt-1">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} @ {event.location}</p>
          <p className="text-jj-gray-800 dark:text-jj-gray-300 mt-4">{event.description}</p>
          
          {!event.isPast && (
            <div className="mt-4">
              <h4 className="font-semibold text-jj-gray-900 dark:text-white">What to Expect:</h4>
              <ul className="list-disc list-inside text-sm text-jj-gray-800 dark:text-jj-gray-300 mt-1 space-y-1">
                  <li>A welcoming environment for all skill levels.</li>
                  <li>A curated selection of our best games.</li>
                  <li>A chance to meet new people and make friends.</li>
                  <li>Lots of laughter and memorable moments.</li>
              </ul>
            </div>
          )}

        </div>
        {!event.isPast && (
          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-jj-purple">₹{event.price}</span>
            <button onClick={handleRegister} className={`${randomButtonColor} text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors`}>
              Register Now
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const data = await getEvents();
      // Add many more events for demonstration
      const moreEvents: Event[] = [
        { id: 'evt10', name: 'Couples Game Night: Valentine\'s Special', date: '2026-02-14T19:00:00Z', location: 'The Love Shack Cafe', description: 'A romantic evening of two-player games.', price: 2999, imageUrl: 'https://picsum.photos/seed/love/600/400', isPast: false },
        { id: 'evt11', name: 'Strategy Board Game Bootcamp', date: '2026-03-05T10:00:00Z', location: 'University Hall', description: 'A full-day deep dive into complex strategy games.', price: 4999, imageUrl: 'https://picsum.photos/seed/strategy/600/400', isPast: false },
        { id: 'evt12', name: 'Family Fun Day', date: '2026-03-20T13:00:00Z', location: 'City Park Pavilion', description: 'Easy-to-learn games for all ages. Kids play free!', price: 799, imageUrl: 'https://picsum.photos/seed/family/600/400', isPast: false },
        { id: 'evt13', name: 'Indie Game Showcase', date: '2026-04-10T18:00:00Z', location: 'Artisan Gallery', description: 'Play the latest creations from independent game designers.', price: 249, imageUrl: 'https://picsum.photos/seed/indie/600/400', isPast: false },
        { id: 'evt14', name: 'Murder Mystery: The Great Gatsby', date: '2025-11-15T19:30:00Z', location: 'The Grand Hotel', description: 'A 1920s themed murder mystery dinner party.', price: 7999, imageUrl: 'https://picsum.photos/seed/gatsby/600/400', isPast: false },
        { id: 'evt15', name: 'Learn to Play: Dungeons & Dragons', date: '2025-10-05T18:00:00Z', location: 'The Adventurer\'s Guild', description: 'A beginner-friendly introduction to the world\'s most popular RPG.', price: 999, imageUrl: 'https://picsum.photos/seed/dnd/600/400', isPast: false },
      ];
      setEvents([...data, ...moreEvents]);
      setLoading(false);
    }
    fetchEvents();
  }, []);
  
  const upcomingEvents = events.filter(e => !e.isPast);
  const pastEvents = events.filter(e => e.isPast);

  const trail = useTrail(upcomingEvents.length, {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0px)' },
      config: { mass: 1, tension: 280, friction: 25 },
  });

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-jj-gray-900 dark:text-white">Play Together (Live)</h1>
          <p className="mt-4 text-lg text-jj-gray-900 dark:text-jj-gray-300 max-w-3xl mx-auto">There's a special kind of magic that happens when people play together in person. Join our game nights, workshops, and community gatherings to experience it for yourself.</p>
        </div>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-jj-gray-900 dark:text-white">Upcoming Events</h2>
          {loading ? <p>Loading events...</p> : (
            <div className="space-y-8">
              {upcomingEvents.length > 0 ? (
                trail.map((style, index) => (
                    <animated.div style={style} key={upcomingEvents[index].id}>
                        <EventCard event={upcomingEvents[index]} />
                    </animated.div>
                ))
              ) : (
                <p className="text-center text-jj-gray-800 dark:text-jj-gray-400 py-8 bg-white/50 rounded-3xl">No upcoming events are scheduled at the moment. Follow us on social media to be the first to know about new dates!</p>
              )}
            </div>
          )}
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-jj-gray-900 dark:text-white">Past Event Showcase</h2>
           <p className="mb-8 text-jj-gray-800 dark:text-jj-gray-300">Curious about what our events are like? Here's a look back at some of the fun we've had. We can't wait to see you at the next one!</p>
           {loading ? <p>Loading events...</p> : (
            <div className="space-y-8">
              {pastEvents.map(event => <EventCard key={event.id} event={event} />)}
            </div>
           )}
        </section>
      </div>
    </div>
  );
};

export default Events;