// hooks/useExcuse.ts
import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';

export const useExcuses = () => {
  const [favorites, setFavorites] = useState<Record<string, string[]>>({});
  const [used, setUsed] = useState<Record<string, string[]>>({});

  useEffect(() => {
    let unsubSnapshot: () => void;
    const unsubAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);

        // Asegurarnos de que el documento exista
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          await setDoc(userRef, { favorites: {}, used: {} }, { merge: true });
        }

        // Ahora sí escuchamos cambios en tiempo real
        unsubSnapshot = onSnapshot(userRef, snapshot => {
          const data = snapshot.data() || {};
          setFavorites(data.favorites || {});
          setUsed(data.used || {});
        });
      } else {
        setFavorites({});
        setUsed({});
      }
    });

    return () => {
      unsubAuth();
      if (unsubSnapshot) unsubSnapshot();
    };
  }, []);

  const saveFavorite = async (category: string, excuse: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No hay usuario logueado');
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        [`favorites.${category}`]: arrayUnion(excuse),
      });
    } catch (e) {
      console.error('Error guardando favorito:', e);
    }
  };

  const removeFavorite = async (category: string, excuse: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No hay usuario logueado');
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        [`favorites.${category}`]: arrayRemove(excuse),
      });
    } catch (e) {
      console.error('Error eliminando favorito:', e);
    }
  };

  const markAsUsed = async (category: string, excuse: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No hay usuario logueado');
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        [`used.${category}`]: arrayUnion(excuse),
      });
    } catch (e) {
      console.error('Error marcando usado:', e);
    }
  };

  return { favorites, used, saveFavorite, removeFavorite, markAsUsed };
};
