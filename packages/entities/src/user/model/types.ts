export interface User {
  /** Firebase UID (уникальный идентификатор) */
  uid: string;

  /** Email адрес */
  email: string;

  /** Отображаемое имя (из Firebase Auth profile или Firestore) */
  displayName: string | null;

  /** URL аватара (Firebase Storage или OAuth provider) */
  photoURL: string | null;

  /** Подтверждён ли email */
  emailVerified: boolean;

  /** Провайдер авторизации (password, google.com, etc.) */
  providerId: string;

  /** User preferences (optional) */
  preferences?: {
    currency?: string;
    theme?: 'light' | 'dark' | 'system';
    language?: string;
  };
}
