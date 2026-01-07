
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { auth, db } from '../firebase';
// FIX: Use firebase/compat imports for v8 compatibility to correctly resolve types and namespaces.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: firebase.User | null;
  loading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(auth.currentUser);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        setLoading(true);
        const userRef = db.collection("users").doc(fbUser.uid);
        const docSnap = await userRef.get();
        
        if (docSnap.exists) {
          setUser(docSnap.data() as User);
        } else {
          // If user exists in Auth but not Firestore (rare, or new anonymous), handle smoothly
           const newUserProfile: User = {
            name: fbUser.displayName || 'Joyful Player',
            email: fbUser.email || 'anonymous@joyjuncture.com',
            avatarUrl: fbUser.photoURL || `https://i.pravatar.cc/150?u=${fbUser.uid}`,
          };
          // Don't overwrite if we are just reloading and data is missing, but for now set it
          setUser(newUserProfile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email?: string, password?: string) => {
    setLoading(true);
    try {
      if (email && password) {
        // Email/Password Login
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        // Anonymous Login fallback
        await auth.signInAnonymously();
      }
    } catch (error) {
      console.error("Login error", error);
      setLoading(false);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const fbUser = userCredential.user;
      
      if (fbUser) {
        await fbUser.updateProfile({
            displayName: name,
            photoURL: `https://i.pravatar.cc/150?u=${fbUser.uid}`
        });

        const newUserProfile: User = {
            name: name,
            email: email,
            avatarUrl: `https://i.pravatar.cc/150?u=${fbUser.uid}`,
        };
        
        // Create user document in Firestore
        await db.collection("users").doc(fbUser.uid).set(newUserProfile);
        setUser(newUserProfile);
      }
    } catch (error) {
      console.error("Registration error", error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  const value = { user, firebaseUser, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
