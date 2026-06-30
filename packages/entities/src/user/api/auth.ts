import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';

import { getFirebaseAuth } from '@fintrack-pro/shared/lib';
import type { User } from '../model/types';
import { type LoginDTO, type RegisterDTO } from './auth.types';

function adapterFirebaseUser(fu: FirebaseUser): User {
  return {
    uid: fu.uid,
    email: fu.email || '',
    displayName: fu.displayName,
    photoURL: fu.photoURL,
    emailVerified: fu.emailVerified,
    providerId: fu.providerId,
  };
}

export const authApi = {
  async login(credentials: LoginDTO): Promise<User> {
    const auth = getFirebaseAuth();

    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);

    return adapterFirebaseUser(userCredential.user);
  },

  async register(credentials: RegisterDTO): Promise<User> {
    const auth = getFirebaseAuth();

    // 1: Создаём пользователя в Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

    const newUser = userCredential.user;

    // 2: Обновляем профиль (displayName)
    if (credentials.displayName && credentials.displayName.trim()) {
      try {
        await updateProfile(newUser, {
          displayName: credentials.displayName.trim(),
        });
        await reload(newUser);
      } catch (error) {
        console.error('[authApi] register:', error);
      }
    }

    return adapterFirebaseUser(newUser);
  },

  async logout(): Promise<void> {
    const auth = getFirebaseAuth();
    await signOut(auth);
  },

  getCurrentUser(): User | null {
    const auth = getFirebaseAuth();
    const fu = auth.currentUser;

    return fu ? adapterFirebaseUser(fu) : null;
  },

  async getIdToken(forceRefresh = false): Promise<string | null> {
    const auth = getFirebaseAuth();
    const fu = auth.currentUser;

    if (!fu) return null;

    return fu.getIdToken(forceRefresh);
  },

  subscribeToAuthChanges(onUserChange: (user: User | null) => void, onError?: (error: Error) => void): () => void {
    const auth = getFirebaseAuth();

    return onAuthStateChanged(
      auth,
      firebaseUser => {
        // Firebase вызывает этот callback:
        // 1. Сразу при подписке (с текущим юзером или null)
        // 2. При login/logout/register
        // 3. При изменении токена (refresh)

        const user = firebaseUser ? adapterFirebaseUser(firebaseUser) : null;
        onUserChange(user);
      },
      onError,
    );
  },
};
