
import React from 'react';

const ExperienceCard: React.FC<{title: string, description: string, imageUrl: string}> = ({title, description, imageUrl}) => (
    <div className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden border border-white/50 dark:border-white/10 h-full flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-56 object-cover"/>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-jj-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-jj-gray-900 dark:text-jj-gray-300 flex-grow">{description}</p>
        </div>
    </div>
)

const Experiences: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your enquiry! We'll be in touch shortly to discuss how we can bring joy to your event.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-jj-gray-900 dark:text-white">Play for Occasions</h1>
          <p className="mt-4 text-lg text-jj-gray-900 dark:text-jj-gray-300 max-w-3xl mx-auto">Go beyond standard entertainment. We partner with you to design unforgettable, curated game experiences for your most important events. Let us be the architects of your fun.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <ExperienceCard title="Corporate Engagement" description="From team-building workshops that actually build teams, to festival game zones that buzz with energy, we help you boost morale, foster collaboration, and celebrate milestones in a way your employees will love." imageUrl="https://picsum.photos/seed/corp/600/400" />
            <ExperienceCard title="Weddings & Hampers" description="Ditch the boring reception lulls. We create unique interactive games, custom wedding-themed activities, and bespoke entertainment hampers that will get your guests mingling, laughing, and creating shared memories." imageUrl="https://picsum.photos/seed/wedding/600/400" />
            <ExperienceCard title="Private Birthdays" description="Make your next birthday celebration legendary. Whether it's a themed murder mystery, a high-energy tournament of party games, or a custom game designed around the guest of honor, we'll make it one for the books." imageUrl="https://picsum.photos/seed/bday/600/400" />
        </div>

        <div className="bg-white/60 dark:bg-jj-gray-800/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 dark:border-white/10 mb-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-jj-gray-900 dark:text-white">Case Study: TechCorp's Annual Summit</h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-xl font-bold text-jj-red">The Problem</h3>
                    <p className="mt-2 text-jj-gray-900 dark:text-jj-gray-200">A 200-person summit with attendees from different departments who rarely interacted. Past events felt siloed and low-energy.</p>
                    <h3 className="text-xl font-bold text-jj-blue mt-6">The Joy Juncture Solution</h3>
                    <p className="mt-2 text-jj-gray-900 dark:text-jj-gray-200">We designed a 'Game of Zones' experience. Attendees were split into multi-department teams and rotated through four zones: a high-stakes strategy game, a creative storytelling challenge, a fast-paced trivia round, and a collaborative puzzle station. The event culminated in a final showdown based on points earned throughout the zones.</p>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-jj-orange">The Result</h3>
                    <p className="mt-2 text-jj-gray-900 dark:text-jj-gray-200">The energy was electric. We saw engineers strategizing with marketers, and junior staff laughing with VPs. The client reported a 95% positive feedback rate on the activity, with many citing it as the highlight of the summit. The event successfully shattered silos and created genuine connections.</p>
                 </div>
            </div>
        </div>


        <div className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 dark:border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-jj-gray-900 dark:text-white">Ready to Play?</h2>
                    <p className="mt-4 text-lg text-jj-gray-900 dark:text-jj-gray-200">Every event is unique, and so is our approach. We don't do cookie-cutter solutions. Fill out the form, and our lead experience designer will get in touch to brainstorm ideas and create a custom proposal for you. Let's make your event unforgettable.</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-center mb-6 text-jj-gray-900 dark:text-white">Plan Your Perfect Event</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input type="text" name="name" id="name" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-jj-orange focus:border-jj-orange bg-white/50 dark:bg-jj-gray-700/50" placeholder="Full Name" />
                        </div>
                         <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input type="email" name="email" id="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-jj-orange focus:border-jj-orange bg-white/50 dark:bg-jj-gray-700/50" placeholder="Email Address" />
                        </div>
                        <div>
                           <label htmlFor="event-type" className="sr-only">Event Type</label>
                           <select id="event-type" name="event-type" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-jj-orange focus:border-jj-orange text-jj-gray-800 dark:text-jj-gray-300 bg-white/50 dark:bg-jj-gray-700/50">
                               <option>Select Event Type...</option>
                               <option>Corporate</option>
                               <option>Wedding</option>
                               <option>Birthday</option>
                               <option>Other</option>
                           </select>
                        </div>
                         <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea name="message" id="message" rows={4} required className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-jj-orange focus:border-jj-orange bg-white/50 dark:bg-jj-gray-700/50" placeholder="Tell us about your event (date, number of guests, vibe, etc.)..."></textarea>
                        </div>
                        <button type="submit" className="w-full bg-jj-orange text-white font-bold py-3 rounded-full hover:bg-opacity-90 transition-colors">
                            Send Enquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
