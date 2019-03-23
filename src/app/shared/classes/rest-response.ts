export class RESTResponse<T> {
  code: number;
  message: string;
  payload: T;

  constructor(code: number, message: string, payload: T) {
    this.code = code;
    this.message = message;
    this.payload = payload;
  }
}
