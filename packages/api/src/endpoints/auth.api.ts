import type { ILoginCredentials, IRegisterCredentials, IUser } from '@fintrack/core';

export const authApi = {
  login: async (credentials: ILoginCredentials): Promise<{ user: IUser; token: string }> => {
    // TODO: заменить на реальный API
    // const response = await apiClient.post('/auth/login', credentials);
    // return response.data;

    // Временная заглушка
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: credentials.email,
            name: 'User',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: 'fake-jwt-token',
        });
      }, 1000);
    });
  },

  register: async (credentials: IRegisterCredentials): Promise<{ user: IUser; token: string }> => {
    // TODO: заменить на реальный API
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: credentials.email,
            name: credentials.name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: 'fake-jwt-token',
        });
      }, 1000);
    });
  },

  logout: async (): Promise<void> => {
    // TODO: заменить на реальный API
    return new Promise(resolve => setTimeout(resolve, 500));
  },
};
