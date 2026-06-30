import { type FirebaseApp, type FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { type Auth, type AuthSettings, getAuth } from 'firebase/auth';
import { type Firestore, getFirestore } from 'firebase/firestore';
import { type FirebaseStorage, getStorage } from 'firebase/storage';

export interface FirebaseConfig extends FirebaseOptions {}

export interface AuthInitOptions {
  settings?: AuthSettings;
  customInitializer?: (app: FirebaseApp) => Auth | Promise<Auth>;
}

let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _firestore: Firestore | undefined;
let _storage: FirebaseStorage | undefined;

export async function initFirebase(
  config: FirebaseConfig,
  authOptions?: AuthInitOptions,
): Promise<{ app: FirebaseApp; auth: Auth; firestore: Firestore; storage: FirebaseStorage }> {
  if (_app && _auth && _firestore && _storage) {
    return { app: _app, auth: _auth, firestore: _firestore, storage: _storage };
  }

  if (!getApps().length) {
    _app = initializeApp(config);
  } else {
    _app = getApp();
  }

  if (!_auth) {
    if (authOptions?.customInitializer) {
      _auth = await authOptions.customInitializer(_app);
    } else {
      _auth = getAuth(_app);
    }
  }

  _firestore = getFirestore(_app);
  _storage = getStorage(_app);

  return { app: _app, auth: _auth, firestore: _firestore, storage: _storage };
}

export function getFirebaseAuth(): Auth {
  if (!_auth) throw new Error('[initFirebase] getFirebaseAuth.');
  return _auth;
}

export function getFirebaseFirestore(): Firestore {
  if (!_firestore) throw new Error('[initFirebase] getFirebaseFirestore.');
  return _firestore;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) throw new Error('[initFirebase] getFirebaseStorage.');
  return _storage;
}

export function isFirebaseInitialized(): boolean {
  return !!(_app && _auth && _firestore && _storage);
}
