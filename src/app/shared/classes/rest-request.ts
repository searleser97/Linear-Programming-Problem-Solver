export class RESTRequest<T> {
  token: string;
  payload: T;
  constructor(token: string, payload: T) {
    this.token = token;
    this.payload = payload;
  }
}
