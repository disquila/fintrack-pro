/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Firebase JSON string */
  readonly VITE_FIREBASE_CONFIG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
