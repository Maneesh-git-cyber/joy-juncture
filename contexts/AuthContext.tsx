import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { auth, db } from '../firebase';
// FIX: Use v8 compat imports and types
// FIX: Use firebase/compat imports for v8 compatibility to correctly resolve types and namespaces.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  // FIX: Use firebase.User type from v8 compat API
  firebaseUser: firebase.User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // FIX: Use firebase.User type from v8 compat API
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(auth.currentUser);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Use v8 compat onAuthStateChanged method
    const unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        setLoading(true);
        // FIX: Use v8 compat Firestore methods
        const userRef = db.collection("users").doc(fbUser.uid);
        const docSnap = await userRef.get();
        if (docSnap.exists) {
          setUser(docSnap.data() as User);
        } else {
          // Create a new profile for anonymous user
          const newUserProfile: User = {
            name: 'Joyful Player',
            email: 'player@joyjuncture.com', // placeholder
            avatarUrl: `https://i.pravatar.cc/150?u=${fbUser.uid}`,
          };
          // FIX: Use v8 compat Firestore set method
          await userRef.set(newUserProfile);
          setUser(newUserProfile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      // FIX: Use v8 compat signInAnonymously method
      await auth.signInAnonymously();
    } catch (error) {
      console.error("Error signing in anonymously", error);
      setLoading(false);
    }
  };

  const logout = async () => {
    // FIX: Use v8 compat signOut method
    await auth.signOut();
  };

  const value = { user, firebaseUser, loading, login, logout };

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
