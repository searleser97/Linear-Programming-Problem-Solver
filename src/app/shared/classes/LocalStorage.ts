export class LocalStorage {
  static saveObject(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  static getObject(key: string): any {
    return JSON.parse(window.localStorage.getItem(key));
  }
  static removeObject(key: string): void {
    window.localStorage.removeItem(key);
  }
    static removeAll(): void {
    window.localStorage.clear();
  }
}
