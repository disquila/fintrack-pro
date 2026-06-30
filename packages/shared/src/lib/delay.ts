export function delay<T>(millis: number, value?: T): Promise<T | undefined> {
  return new Promise((resolve): void => {
    setTimeout(() => {
      resolve(value);
    }, millis);
  });
}
