// Базовый API клиент (временно заглушка, потом заменим на axios)
export const apiClient = {
  async post<T>(url: string, data: unknown): Promise<T> {
    // TODO: заменить на реальный axios/fetch
    // eslint-disable-next-line no-console
    console.log(`[API] POST ${url}`, data);
    return new Promise(resolve => {
      setTimeout(() => resolve(data as T), 500);
    });
  },
  async get<T>(url: string): Promise<T> {
    // TODO: заменить на реальный axios/fetch
    // eslint-disable-next-line no-console
    console.log(`[API] GET ${url}`);
    return new Promise(resolve => {
      setTimeout(() => resolve({} as T), 500);
    });
  },
};
