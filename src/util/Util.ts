export class Util {
  static sleep = async (timeout: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
}
