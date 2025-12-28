
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';

const Wallet: React.FC = () => {
  const { user, login, loading: authLoading } = useAuth();
  const { totalPoints, transactions, loading: walletLoading } = useWallet();

  if (authLoading) {
    return <div className="text-center py-20">Authenticating...</div>
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-2xl font-bold text-jj-gray-900 dark:text-white">Your Adventure Awaits!</h2>
        <p className="text-jj-gray-800 dark:text-jj-gray-300 mt-2 max-w-md mx-auto">Log in to unlock your personal Joy Wallet, track your points, and see how close you are to your next reward.</p>
        <button onClick={login} className="mt-6 bg-jj-orange text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all">
          Login to View Your Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"/>
            <h1 className="text-3xl font-extrabold text-jj-gray-900 dark:text-white">Welcome back, {user.name}!</h1>
            <p className="text-lg text-jj-gray-800 dark:text-jj-gray-300 mt-2">Here's a summary of your journey with us.</p>
        </div>

        <div className="bg-gradient-to-r from-jj-purple to-jj-blue text-white p-8 rounded-3xl shadow-2xl text-center mb-12">
            <p className="text-lg font-medium opacity-80">Your Total Joy Points</p>
            {walletLoading ? 
                <div className="h-16 w-32 bg-white/30 rounded-lg mx-auto mt-2 animate-pulse" /> : 
                <p className="text-6xl font-bold mt-2">{totalPoints}</p>
            }
            <p className="mt-4 opacity-90 max-w-xl mx-auto">This is more than a number; it's a record of your fun! Redeem points for exclusive discounts, merchandise, and event tickets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/50 dark:border-white/10">
                <h3 className="text-xl font-bold text-green-500 mb-3">How to Earn Points</h3>
                <ul className="list-disc list-inside space-y-2 text-jj-gray-900 dark:text-jj-gray-200">
                    <li><span className="font-semibold">Shop:</span> Earn points for every game you purchase.</li>
                    <li><span className="font-semibold">Attend:</span> Get points for joining our live events and workshops.</li>
                    <li><span className="font-semibold">Play:</span> Solve our online puzzles and riddles for daily points.</li>
                    <li><span className="font-semibold">Engage:</span> Special bonuses for community participation!</li>
                </ul>
            </div>
             <div className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/50 dark:border-white/10">
                <h3 className="text-xl font-bold text-jj-orange mb-3">How to Redeem</h3>
                <p className="text-jj-gray-900 dark:text-jj-gray-200">Your points are your passport to more joy! Redeem them at checkout for discounts on games, or use them to get money off tickets for our upcoming events. More redemption options coming soon!</p>
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-6 text-jj-gray-900 dark:text-white">Points History</h2>
            <div className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden border border-white/50 dark:border-white/10">
                {walletLoading ? <p className="p-6 text-center">Loading history...</p> : transactions.length > 0 ? (
                    <ul className="divide-y divide-jj-gray-200 dark:divide-jj-gray-700">
                        {transactions.map(tx => (
                            <li key={tx.id} className="p-4 sm:p-6 flex justify-between items-center hover:bg-jj-gray-50/50 dark:hover:bg-jj-gray-900/20">
                                <div>
                                    <p className="font-semibold text-jj-gray-900 dark:text-white">{tx.description}</p>
                                    <p className="text-sm text-jj-gray-500 dark:text-jj-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
                                </div>
                                <span className={`text-lg font-bold ${tx.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {tx.points > 0 ? '+' : ''}{tx.points}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center p-8 text-jj-gray-800 dark:text-jj-gray-400">Your points history is empty. Start earning by shopping, attending events, or playing online!</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
