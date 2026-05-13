export interface IUser {
  id: string; // UUID v4
  email: string; // email@example.com
  name: string; // полное имя
  avatar?: string; // опционально (может не быть)
  createdAt: string; // ISO 8601: "2024-01-15T10:30:00Z"
  updatedAt: string;
}

export interface IAuthState {
  user: IUser | null; // null = не авторизован
  token: string | null; // JWT токен
  isLoading: boolean; // загрузка
  error: string | null; // ошибка
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials extends ILoginCredentials {
  name: string;
  confirmPassword: string;
}
