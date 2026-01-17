
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: firebase.User | null;
  loading: boolean;
  login: (identifier?: string, password?: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
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
        try {
          const userRef = db.collection('users').doc(fbUser.uid);
          const docSnap = await userRef.get();

          if (docSnap.exists) {
            setUser(docSnap.data() as User);
          } else {
            const newUserProfile: User = {
              name: fbUser.displayName || 'Joyful Player',
              email: fbUser.email || 'anonymous@joyjuncture.com',
              username: 'anonymous',
            };
            setUser(newUserProfile);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setUser({
            name: fbUser.displayName || 'Player',
            email: fbUser.email || '',
            username: 'guest',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (identifier?: string, password?: string) => {
    setLoading(true);
    try {
      if (identifier && password) {
        let emailToLogin = identifier;

        if (!identifier.includes('@')) {
          const userSnapshot = await db.collection('users').where('username', '==', identifier).limit(1).get();
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            emailToLogin = userData.email;
          } else {
            throw new Error('Username not found.');
          }
        }

        await auth.signInWithEmailAndPassword(emailToLogin, password);
      } else {
        await auth.signInAnonymously();
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      throw error;
    }
  };

  const register = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      try {
        const usernameCheck = await db.collection('users').where('username', '==', username).limit(1).get();
        if (!usernameCheck.empty) {
          throw new Error('Username is already taken. Please choose another.');
        }
      } catch (err: any) {
        if (err.code === 'permission-denied') {
          throw new Error('Database permissions error. Please check Firestore Rules.');
        }
        throw err;
      }

      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const fbUser = userCredential.user;

      if (fbUser) {
        await fbUser.updateProfile({
          displayName: username,
        });

        const newUserProfile: User = {
          name: username,
          email: email,
          username: username,
        };

        try {
          await db.collection('users').doc(fbUser.uid).set(newUserProfile);
          setUser(newUserProfile);
        } catch (firestoreError) {
          console.error('Error creating user profile in DB:', firestoreError);
          throw new Error('Account created, but profile setup failed.');
        }
      }
    } catch (error) {
      console.error('Registration flow error:', error);
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

export default AuthContext;
