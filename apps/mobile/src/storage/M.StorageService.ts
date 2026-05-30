import { StorageService } from '@fintrack-pro/core';

class MStorageService extends StorageService {
  private memory: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.memory.get(key) || null;
  }

  setItem(key: string, value: string): void {
    this.memory.set(key, value);
  }

  removeItem(key: string): void {
    this.memory.delete(key);
  }
}

export const nativeStorage = new MStorageService();
