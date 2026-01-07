
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/wallet');
    } catch (error: any) {
      console.error(error);
      alert('Failed to log in: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <MotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-white/10 p-8 sm:p-10"
      >
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-jj-gray-900 dark:text-white">Welcome Back</h2>
            <p className="mt-2 text-jj-gray-600 dark:text-jj-gray-300">Log in to continue your journey of joy.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-2">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-jj-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-jj-purple focus:border-transparent outline-none transition-all"
                    placeholder="you@example.com"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-2">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-jj-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-jj-purple focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-jj-gray-600 dark:text-jj-gray-400">
                    <input type="checkbox" className="mr-2 rounded text-jj-purple focus:ring-jj-purple" />
                    Remember me
                </label>
                <a href="#" className="text-jj-purple hover:text-jj-sky font-medium">Forgot Password?</a>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-jj-purple to-jj-blue text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:opacity-90 transition-all transform active:scale-95 disabled:opacity-50"
            >
                {loading ? 'Logging in...' : 'Log In'}
            </button>
        </form>

        <div className="mt-8 text-center text-sm text-jj-gray-600 dark:text-jj-gray-400">
            Don't have an account? <Link to="/register" className="font-bold text-jj-purple hover:text-jj-sky">Sign up</Link>
        </div>
      </MotionDiv>
    </div>
  );
};

export default Login;
