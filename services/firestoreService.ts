
import { db } from '../firebase';
// FIX: Removed v9 firestore imports as they are no longer used
import { Product, Event, WalletTransaction } from '../types';

// In a real app, this data would live in Firestore. For this demo, we'll mock it.
const MOCK_PRODUCTS: Product[] = [
    { id: 'dead-mans-deck', name: "Dead Man's Deck", tagline: "A pirate-themed card game of treasure and treachery.", price: 1999, imageUrl: 'https://picsum.photos/seed/dmd/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 2, max: 4 }, useCases: [], badges: ['Best Seller', 'Quick Play'], category: 'Card Game', occasion: 'Party', mood: 'Competitive' },
    { id: 'storytellers-saga', name: "Storyteller's Saga", tagline: "A creative card game of collaborative storytelling.", price: 2499, imageUrl: 'https://picsum.photos/seed/mehfil/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 3, max: 6 }, useCases: [], badges: ['New!', 'Storytelling'], category: 'Card Game', occasion: 'Family', mood: 'Casual' },
    { id: 'drama-kings', name: "Drama Kings", tagline: "A party game of over-the-top acting and hilarious scenes.", price: 2299, imageUrl: 'https://picsum.photos/seed/tamasha/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 4, max: 10 }, useCases: [], badges: ['Great for Groups'], category: 'Card Game', occasion: 'Party', mood: 'Funny' },
    { id: 'one-more-round-150', name: "One More Round (150 pcs)", tagline: "A jigsaw puzzle for a cozy night in.", price: 1799, imageUrl: 'https://picsum.photos/seed/omr150/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 1, max: 'any' }, useCases: [], badges: [], category: 'Puzzle', occasion: 'Couples', mood: 'Casual' },
    { id: 'dreamers-fair-36', name: "Dreamer’s Fair (36 pcs)", tagline: "A whimsical puzzle perfect for beginners.", price: 1299, imageUrl: 'https://picsum.photos/seed/df36/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 1, max: 'any' }, useCases: [], badges: ['First-time Friendly'], category: 'Puzzle', occasion: 'Family', mood: 'Casual' },
    { id: 'bloody-inheritance', name: "The Bloody Inheritance", tagline: "A thrilling murder mystery party kit.", price: 3499, imageUrl: 'https://picsum.photos/seed/bi/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 6, max: 8 }, useCases: [], badges: [], category: 'Murder Mystery', occasion: 'Party', mood: 'Strategy' },
    { id: 'judge-me-guess', name: "Judge Me & Guess", tagline: "Find out what your friends really think of you!", price: 1599, imageUrl: 'https://picsum.photos/seed/jmg/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 3, max: 8 }, useCases: [], badges: [], category: 'Card Game', occasion: 'Ice Breaker', mood: 'Funny' },
    { id: 'she-dare-mayhem', name: "She Dare Mayhem – Bachelorette Edition", tagline: "The ultimate dare game for a wild night.", price: 1899, imageUrl: 'https://picsum.photos/seed/sdm/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 3, max: '10+' }, useCases: [], badges: [], category: 'Card Game', occasion: 'Party', mood: 'Funny' },
    { id: 'court52', name: "Court52 - Pickleball Card Game", tagline: "Serve up some fun with this pickleball-themed game.", price: 2099, imageUrl: 'https://picsum.photos/seed/c52/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 2, max: 4 }, useCases: [], badges: [], category: 'Card Game', occasion: 'Party', mood: 'Competitive' },
    { id: 'buzzed', name: "Buzzed", tagline: "The classic drinking game, now with a twist.", price: 1499, imageUrl: 'https://picsum.photos/seed/buzzed/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 3, max: '20+' }, useCases: [], badges: [], category: 'Card Game', occasion: 'Party', mood: 'Funny' },
    { id: 'cosmic-colonies', name: "Cosmic Colonies", tagline: "A sci-fi board game of interstellar expansion.", price: 4499, imageUrl: 'https://picsum.photos/seed/cosmic/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 2, max: 4 }, useCases: [], badges: ['Deep Strategy'], category: 'Board Game', occasion: 'Party', mood: 'Strategy' },
    { id: 'the-alchemist', name: "The Alchemist's Secret", tagline: "A cooperative puzzle game of potions and riddles.", price: 2799, imageUrl: 'https://picsum.photos/seed/alchemist/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 1, max: 4 }, useCases: [], badges: [], category: 'Board Game', occasion: 'Couples', mood: 'Strategy' },
    { id: 'heist-night', name: "Heist Night", tagline: "Work together to pull off the perfect crime.", price: 3199, imageUrl: 'https://picsum.photos/seed/heist/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 2, max: 5 }, useCases: [], badges: [], category: 'Board Game', occasion: 'Ice Breaker', mood: 'Strategy' },
    { id: 'doodle-dash', name: "Doodle Dash", tagline: "The fast-paced game of drawing and guessing.", price: 1899, imageUrl: 'https://picsum.photos/seed/doodle/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 3, max: 8 }, useCases: [], badges: ['Family Favorite'], category: 'Board Game', occasion: 'Family', mood: 'Funny' },
    { id: 'galaxy-puzzle', name: "Galaxy Puzzle (1000 pcs)", tagline: "Get lost in the cosmos with this stunning puzzle.", price: 2499, imageUrl: 'https://picsum.photos/seed/galaxy/600/400', description: '...', concept: '...', howToPlay: '...', playerCount: { min: 1, max: 'any' }, useCases: [], badges: [], category: 'Puzzle', occasion: 'Family', mood: 'Casual' },
];

const MOCK_EVENTS: Event[] = [
    { id: 'evt1', name: 'Game Night Live', date: '2025-12-25T19:00:00Z', location: 'Downtown Hall', description: 'A fun night of board games.', price: 499, imageUrl: 'https://picsum.photos/seed/gnl/600/400', isPast: false },
    { id: 'evt2', name: 'Board Game Bonanza', date: '2025-11-20T18:00:00Z', location: 'The Community Hub', description: 'Discover new and classic board games with fellow enthusiasts.', price: 799, imageUrl: 'https://picsum.photos/seed/bgb/600/400', isPast: false },
    { id: 'evt3', name: 'Summer Game Fest', date: '2024-07-15T14:00:00Z', location: 'City Park', description: 'An outdoor celebration of games, food, and fun.', price: 999, imageUrl: 'https://picsum.photos/seed/sgf/600/400', isPast: true },
    { id: 'evt4', name: 'Halloween Horror Games', date: '2024-10-31T20:00:00Z', location: 'The Old Mansion', description: 'A spooky night of horror-themed board games.', price: 1299, imageUrl: 'https://picsum.photos/seed/hhg/600/400', isPast: true },
    { id: 'evt5', name: 'New Year\'s Eve Game Gala', date: '2024-12-31T21:00:00Z', location: 'The Grand Ballroom', description: 'Ring in the new year with games, music, and celebration.', price: 2499, imageUrl: 'https://picsum.photos/seed/nyegg/600/400', isPast: true },
]

const MOCK_BLOGS = [
    { id: '1', title: 'The Art of Losing Gracefully (and Why It Matters)', date: '2024-06-01T10:00:00Z', excerpt: 'We\'ve all seen it: the flipped board, the dramatic sigh, the accusations of cheating. Winning is fun, but learning to lose with grace is a skill that makes game night better for everyone. We explore the psychology behind sore losers and share tips on fostering a more positive play environment.', imageUrl: 'https://picsum.photos/seed/blog1/600/400' },
    { id: '2', title: 'Behind the Scenes: Designing Dead Man\'s Deck', date: '2024-05-15T14:00:00Z', excerpt: 'Ever wondered how a game goes from a simple idea to a finished product? Join our lead designer on a journey through the creation of our best-selling pirate game, Dead Man\'s Deck. From initial sketches to countless playtests, we reveal the secrets of the design process.', imageUrl: 'https://picsum.photos/seed/blog2/600/400' },
    { id: '3', title: 'Top 5 Ice Breaker Games for Your Next Party', date: '2024-04-28T11:00:00Z', excerpt: 'Throwing a party where guests don\'t know each other can be awkward. The solution? A great ice breaker game! We count down our top five games that are guaranteed to get people talking, laughing, and connecting in no time.', imageUrl: 'https://picsum.photos/seed/blog3/600/400' },
]


export const getProducts = async (): Promise<Product[]> => {
  // Simulating an API call
  return new Promise(resolve => setTimeout(() => resolve(MOCK_PRODUCTS), 500));
};

export const getProductById = async (id: string): Promise<Product | null> => {
    // Simulating an API call
    return new Promise(resolve => {
        const product = MOCK_PRODUCTS.find(p => p.id === id) || null;
        setTimeout(() => resolve(product), 300)
    });
}

export const getEvents = async (): Promise<Event[]> => {
    // Simulating an API call
    return new Promise(resolve => setTimeout(() => resolve(MOCK_EVENTS.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())), 500));
}

export const getBlogPosts = async () => {
    // Simulating an API call
    return new Promise(resolve => setTimeout(() => resolve(MOCK_BLOGS), 500));
}


export const getWalletTransactions = async (userId: string): Promise<WalletTransaction[]> => {
    // FIX: Use v8 compat Firestore methods
    const transactionsCol = db.collection(`users/${userId}/wallet`).orderBy('date', 'desc');
    const transactionSnapshot = await transactionsCol.get();
    
    // Add initial points for new user
    if (transactionSnapshot.empty) {
        await addWalletTransaction(userId, 'Welcome to Joy Juncture!', 100, true);
        const newSnapshot = await transactionsCol.get();
        return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction));
    }

    return transactionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction));
}

export const addWalletTransaction = async (userId: string, description: string, points: number, isInitial = false): Promise<void> => {
    // FIX: Use v8 compat Firestore methods
    const transactionsCol = db.collection(`users/${userId}/wallet`);
    
    // Prevent adding welcome points multiple times if there's a race condition
    if (isInitial) {
        const q = transactionsCol.where("description", "==", "Welcome to Joy Juncture!");
        const welcomeSnapshot = await q.get();
        if (!welcomeSnapshot.empty) return;
    }

    await transactionsCol.add({
        description,
        points,
        date: new Date().toISOString(),
    });
}