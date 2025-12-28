
import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';

const SUDOKU_PUZZLE = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const SUDOKU_SOLUTION = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const SudokuGrid: React.FC = () => {
    const { addPoints } = useWallet();
    const [grid, setGrid] = useState(SUDOKU_PUZZLE.map(row => [...row]));
    const [solved, setSolved] = useState(false);

    const handleChange = (row: number, col: number, value: string) => {
        const num = parseInt(value) || 0;
        if (num >= 0 && num <= 9) {
            const newGrid = grid.map(r => [...r]);
            newGrid[row][col] = num;
            setGrid(newGrid);
        }
    };

    const checkSolution = async () => {
        if (JSON.stringify(grid) === JSON.stringify(SUDOKU_SOLUTION)) {
            await addPoints('Solved Sudoku Puzzle', 25);
            alert('Congratulations! You solved it! You earned 25 Joy Points.');
            setSolved(true);
        } else {
            alert('Not quite right. Keep trying!');
        }
    };

    return (
        <div className="p-6 bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-white/10">
            <h3 className="text-xl font-bold mb-2 text-jj-gray-900 dark:text-white">Daily Sudoku Challenge</h3>
            <p className="text-sm text-jj-gray-800 dark:text-jj-gray-300 mb-4">Fill the grid so that every row, column, and 3x3 box contains the digits 1 through 9. Solve it to earn 25 points!</p>
            <div className="grid grid-cols-9 gap-1 mx-auto w-min">
                {grid.map((row, rIndex) => 
                    row.map((cell, cIndex) => (
                        <input
                            key={`${rIndex}-${cIndex}`}
                            type="text"
                            pattern="\d*"
                            maxLength={1}
                            value={cell === 0 ? '' : cell}
                            readOnly={SUDOKU_PUZZLE[rIndex][cIndex] !== 0}
                            onChange={(e) => handleChange(rIndex, cIndex, e.target.value)}
                            className={`w-10 h-10 md:w-12 md:h-12 text-center text-lg font-semibold border rounded-md
                                ${SUDOKU_PUZZLE[rIndex][cIndex] !== 0 ? 'bg-jj-gray-200 dark:bg-jj-gray-600 text-jj-gray-900 dark:text-white' : 'bg-white dark:bg-jj-gray-700 text-jj-blue'}
                                ${cIndex % 3 === 2 && cIndex < 8 ? 'border-r-2 border-r-jj-gray-400 dark:border-r-jj-gray-500' : 'border-r-gray-300 dark:border-r-jj-gray-600'}
                                ${rIndex % 3 === 2 && rIndex < 8 ? 'border-b-2 border-b-jj-gray-400 dark:border-b-jj-gray-500' : 'border-b-gray-300 dark:border-b-jj-gray-600'}
                            `}
                        />
                    ))
                )}
            </div>
            <button onClick={checkSolution} disabled={solved} className="mt-6 w-full bg-jj-blue text-white font-bold py-2 rounded-full hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {solved ? 'Solved! +25 Points' : 'Check Solution'}
            </button>
        </div>
    );
};

const RiddleGame: React.FC = () => {
    const { addPoints } = useWallet();
    const [answer, setAnswer] = useState('');
    const [solved, setSolved] = useState(false);

    const checkAnswer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (answer.toLowerCase().includes('echo')) {
            await addPoints('Solved Daily Riddle', 10);
            alert('Correct! An echo it is! You earned 10 Joy Points.');
            setSolved(true);
        } else {
            alert('Not quite right. Give it another thought!');
        }
    }

    return (
        <div className="p-6 bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-white/10">
            <h3 className="text-xl font-bold mb-2 text-jj-gray-900 dark:text-white">Daily Riddle</h3>
            <p className="text-sm text-jj-gray-800 dark:text-jj-gray-300 mb-4">Solve this riddle to earn 10 points! A new one appears every day.</p>
            <p className="text-jj-gray-900 dark:text-jj-gray-300 mb-4 italic">"I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"</p>
            <form onSubmit={checkAnswer} className="space-y-4">
                <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} disabled={solved} className="w-full px-4 py-2 border rounded-xl focus:ring-jj-orange" placeholder="Your answer"/>
                <button type="submit" disabled={solved} className="w-full bg-jj-orange text-white font-bold py-2 rounded-full hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {solved ? 'Solved! +10 Points' : 'Submit Answer'}
                </button>
            </form>
        </div>
    )
}


const Play: React.FC = () => {
  const { user, login, loading } = useAuth();
  
  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-2xl font-bold text-jj-gray-900 dark:text-white">Log in to Play & Earn</h2>
        <p className="text-jj-gray-800 dark:text-jj-gray-300 mt-2 max-w-md mx-auto">Our online games are a fun way to earn Joy Points! Log in to save your progress and add points to your wallet.</p>
        <button onClick={login} className="mt-6 bg-jj-orange text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all">
          Login to Play
        </button>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-jj-gray-900 dark:text-white">Free Online Games</h1>
          <p className="mt-4 text-lg text-jj-gray-800 dark:text-jj-gray-300">Sharpen your mind, have some fun, and earn Joy Points! A perfect break for your day.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <SudokuGrid />
            <RiddleGame />
        </div>
      </div>
    </div>
  );
};

export default Play;
