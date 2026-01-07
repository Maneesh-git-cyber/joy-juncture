
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
    }
    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name); 
      navigate('/wallet');
    } catch (error: any) {
      console.error(error);
      alert('Failed to create account: ' + error.message);
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
            <h2 className="text-3xl font-extrabold text-jj-gray-900 dark:text-white">Create Account</h2>
            <p className="mt-2 text-jj-gray-600 dark:text-jj-gray-300">Join the Joy Juncture community today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-2">Full Name</label>
                <input 
                    type="text" 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-jj-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-jj-purple focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-2">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-jj-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-jj-purple focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>
             <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-2">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    required 
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-jj-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-jj-purple focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-jj-sky to-jj-blue text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:opacity-90 transition-all transform active:scale-95 disabled:opacity-50 mt-4"
            >
                {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
        </form>

        <div className="mt-8 text-center text-sm text-jj-gray-600 dark:text-jj-gray-400">
            Already have an account? <Link to="/login" className="font-bold text-jj-purple hover:text-jj-sky">Log in</Link>
        </div>
      </MotionDiv>
    </div>
  );
};

export default Register;
