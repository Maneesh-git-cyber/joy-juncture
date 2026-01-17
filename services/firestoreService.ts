
import { db } from '../firebase';
import { Product, Event, WalletTransaction } from '../types';

const MOCK_PRODUCTS: Product[] = [
    { 
        id: 'dead-mans-deck', 
        name: "Dead Man's Deck", 
        tagline: "A pirate-themed card game of treasure and treachery.", 
        price: 1999, 
        imageUrl: 'https://picsum.photos/seed/dmd/600/400', 
        description: 'Set sail on a treacherous adventure where alliances are fragile and betrayal is just one card draw away. In Dead Man’s Deck, you are a pirate captain vying for the legendary cursed treasure.', 
        concept: 'Social Deduction & Hand Management.', 
        howToPlay: '1. Draw cards to gather gold.\n2. Avoid the Black Spot.\n3. Bluff, steal, and mutiny to survive.', 
        playerCount: { min: 2, max: 4 }, 
        useCases: ['Game Night', 'Travel'], 
        badges: ['Best Seller'], 
        category: 'Card Game', 
        occasion: 'Party', 
        mood: 'Competitive' 
    },
    { 
        id: 'mehfil', 
        name: "Mehfil", 
        tagline: "A creative card game of collaborative storytelling.", 
        price: 2499, 
        imageUrl: 'https://picsum.photos/seed/mehfil/600/400', 
        description: 'Unleash your inner bard. Mehfil provides beautiful, abstract prompts that guide players in weaving a collective tale. From epic fantasies to hilarious comedies.', 
        concept: 'Collaborative Storytelling.', 
        howToPlay: '1. Draw a setting card.\n2. Add elements to the story.\n3. Introduce plot twists.', 
        playerCount: { min: 3, max: 6 }, 
        useCases: ['Creative Writing', 'Ice Breaker', 'Family Bonding'], 
        badges: ['New!', 'Storytelling'], 
        category: 'Card Game', 
        occasion: 'Family', 
        mood: 'Casual' 
    },
    { 
        id: 'tamasha', 
        name: "Tamasha", 
        tagline: "A party game of over-the-top acting and hilarious scenes.", 
        price: 2299, 
        imageUrl: 'https://picsum.photos/seed/tamasha/600/400', 
        description: 'Put your acting chops to the test! Tamasha is a high-energy charades-style game where players must act out ridiculous scenarios and intense emotions.', 
        concept: 'Improv & Performance.', 
        howToPlay: '1. Draw Scenario & Emotion cards.\n2. Act it out in 60s.\n3. Team guesses for points.', 
        playerCount: { min: 4, max: 10 }, 
        useCases: ['House Party', 'Team Building'], 
        badges: ['Great for Groups'], 
        category: 'Card Game', 
        occasion: 'Party', 
        mood: 'Funny' 
    },
    { 
        id: 'one-more-round-150', 
        name: "One More Round (150 pcs)", 
        tagline: "A jigsaw puzzle for a cozy night in.", 
        price: 1799, 
        imageUrl: 'https://picsum.photos/seed/omr150/600/400', 
        description: 'Relax and unwind with this vibrant 150-piece puzzle featuring a cozy, illustrated pub scene.', 
        concept: 'Mindfulness.', 
        howToPlay: 'Assemble the pieces to reveal the art.', 
        playerCount: { min: 1, max: 'any' }, 
        useCases: ['Relaxation', 'Solo Date'], 
        badges: [], 
        category: 'Puzzle', 
        occasion: 'Couples', 
        mood: 'Casual' 
    },
    { 
        id: 'dreamers-fair-36', 
        name: "Dreamer’s Fair (36 pcs)", 
        tagline: "A whimsical puzzle perfect for beginners.", 
        price: 1299, 
        imageUrl: 'https://picsum.photos/seed/df36/600/400', 
        description: 'Enter a world of floating carousels and candy-floss clouds. Large pieces ideal for quick breaks or kids.', 
        concept: 'Visual Storytelling.', 
        howToPlay: 'Connect the large pieces to see the fairground.', 
        playerCount: { min: 1, max: 'any' }, 
        useCases: ['Kids', 'Quick Break'], 
        badges: ['First-time Friendly'], 
        category: 'Puzzle', 
        occasion: 'Family', 
        mood: 'Casual' 
    },
    { 
        id: 'bloody-inheritance', 
        name: "The Bloody Inheritance", 
        tagline: "A thrilling murder mystery party kit.", 
        price: 3499, 
        imageUrl: 'https://picsum.photos/seed/bi/600/400', 
        description: 'Old Man billionaires don’t just die... they are murdered. Contains character booklets, clues, and evidence.', 
        concept: 'LARP (Live Action Role Play).', 
        howToPlay: '1. Assign characters.\n2. Reveal clues each round.\n3. Interrogate and find the killer.', 
        playerCount: { min: 6, max: 8 }, 
        useCases: ['Dinner Party', 'Halloween'], 
        badges: ['Immersive'], 
        category: 'Murder Mystery', 
        occasion: 'Party', 
        mood: 'Strategy' 
    },
    { 
        id: 'judge-me-guess', 
        name: "Judge Me & Guess", 
        tagline: "Find out what your friends really think of you!", 
        price: 1599, 
        imageUrl: 'https://picsum.photos/seed/jmg/600/400', 
        description: 'A hilarious game of first impressions. Players answer "Who is most likely to..." questions, but you have to guess who voted for you!', 
        concept: 'Social Perception.', 
        howToPlay: '1. Read a prompt.\n2. Vote for a player.\n3. The target guesses who voted for them.', 
        playerCount: { min: 3, max: 8 }, 
        useCases: ['Drinks Night', 'College Dorm'], 
        badges: [], 
        category: 'Card Game', 
        occasion: 'Ice Breaker', 
        mood: 'Funny' 
    },
    { 
        id: 'she-dare-mayhem', 
        name: "She Dare Mayhem", 
        tagline: "Bachelorette Edition: The ultimate dare game.", 
        price: 1899, 
        imageUrl: 'https://picsum.photos/seed/sdm/600/400', 
        description: 'The perfect companion for a Bachelorette party or a Girls Night Out. Cheeky, bold, and fun.', 
        concept: 'Social Challenges.', 
        howToPlay: '1. Draw a dare.\n2. Do it or drink/forfeit.\n3. Bride decides penalties.', 
        playerCount: { min: 3, max: '10+' }, 
        useCases: ['Bachelorette', 'Girls Night'], 
        badges: [], 
        category: 'Card Game', 
        occasion: 'Party', 
        mood: 'Funny' 
    },
    { 
        id: 'court52', 
        name: "Court52", 
        tagline: "Pickleball Card Game: Serve up some fun.", 
        price: 2099, 
        imageUrl: 'https://picsum.photos/seed/c52/600/400', 
        description: 'Simulates the fast-paced rallies of Pickleball using a card mechanic. Smash, Dink, and Lob to victory.', 
        concept: 'Sports Simulation.', 
        howToPlay: '1. Play shot cards simultaneously.\n2. Higher value/counter wins the rally.\n3. First to 11.', 
        playerCount: { min: 2, max: 4 }, 
        useCases: ['Sports Fans', 'After Practice'], 
        badges: [], 
        category: 'Card Game', 
        occasion: 'Party', 
        mood: 'Competitive' 
    },
    { 
        id: 'buzzed', 
        name: "Buzzed", 
        tagline: "The classic drinking game, now with a twist.", 
        price: 1499, 
        imageUrl: 'https://picsum.photos/seed/buzzed/600/400', 
        description: 'Hydrate responsibly! Buzzed is the card game that gets you and your friends talking and laughing.', 
        concept: 'Drinking/Party Game.', 
        howToPlay: '1. Draw a card.\n2. Read the condition.\n3. Drink if it applies to you.', 
        playerCount: { min: 3, max: '20+' }, 
        useCases: ['Pre-game', 'Parties'], 
        badges: ['Adults Only'], 
        category: 'Card Game', 
        occasion: 'Party', 
        mood: 'Funny' 
    }
];

const MOCK_EVENTS: Event[] = [
    { id: 'evt1', name: 'Game Night Live', date: '2025-12-25T19:00:00Z', location: 'Downtown Hall', description: 'A fun night of board games.', price: 499, imageUrl: 'https://picsum.photos/seed/gnl/600/400', isPast: false },
    { id: 'evt2', name: 'Board Game Bonanza', date: '2025-11-20T18:00:00Z', location: 'The Community Hub', description: 'Discover new and classic board games with fellow enthusiasts.', price: 799, imageUrl: 'https://picsum.photos/seed/bgb/600/400', isPast: false },
    { id: 'evt3', name: 'Summer Game Fest', date: '2024-07-15T14:00:00Z', location: 'City Park', description: 'An outdoor celebration of games, food, and fun.', price: 999, imageUrl: 'https://picsum.photos/seed/sgf/600/400', isPast: true },
];

const MOCK_BLOGS = [
    { id: '1', title: 'The Art of Losing Gracefully', date: '2024-06-01T10:00:00Z', excerpt: 'Winning is fun, but learning to lose with grace is a skill that makes game night better for everyone.', imageUrl: 'https://picsum.photos/seed/blog1/600/400' },
    { id: '2', title: 'Designing Mehfil: Behind the Scenes', date: '2024-05-15T14:00:00Z', excerpt: 'How we turned a simple idea about storytelling into our most creative card game yet.', imageUrl: 'https://picsum.photos/seed/blog2/600/400' },
];

export const getProducts = async (): Promise<Product[]> => {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_PRODUCTS), 500));
};

export const getProductById = async (id: string): Promise<Product | null> => {
    return new Promise(resolve => {
        const product = MOCK_PRODUCTS.find(p => p.id === id) || null;
        setTimeout(() => resolve(product), 300)
    });
}

export const getEvents = async (): Promise<Event[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_EVENTS.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())), 500));
}

export const getBlogPosts = async () => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_BLOGS), 500));
}

export const getWalletTransactions = async (userId: string): Promise<WalletTransaction[]> => {
    const transactionsCol = db.collection(`users/${userId}/wallet`).orderBy('date', 'desc');
    const transactionSnapshot = await transactionsCol.get();

    if (transactionSnapshot.empty) {
        await addWalletTransaction(userId, 'Welcome to Joy Juncture!', 0, true);
        const newSnapshot = await transactionsCol.get();
        return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction));
    }
    return transactionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction));
};

export const addWalletTransaction = async (userId: string, description: string, points: number, isInitial = false): Promise<void> => {
    const transactionsCol = db.collection(`users/${userId}/wallet`);
    if (isInitial) {
        const q = transactionsCol.where('description', '==', 'Welcome to Joy Juncture!');
        const welcomeSnapshot = await q.get();
        if (!welcomeSnapshot.empty) return;
    }
    await transactionsCol.add({
        description,
        points,
        date: new Date().toISOString(),
    });
};
