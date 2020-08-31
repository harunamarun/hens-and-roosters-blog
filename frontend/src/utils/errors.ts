class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NetworkStatusError extends BaseError {
  constructor(public statusCode: number) {
    super(`Network error! StatusCode: ${String(statusCode)}`);
  }
}

export class NetworkError extends BaseError {}
