export class ErrorResponse {
  statusCode?: number;
  stack?: string;
  message?: string;
  errorMessages?: string[];

  constructor(data: {
    statusCode?: number;
    message?: string;
    errorMessages?: string[];
    stack?: any;
  }) {
    this.statusCode = data.statusCode || 500;
    this.message = data.message || 'Internal Server Error';
    this.errorMessages = data.errorMessages || undefined;

    if (data.stack) {
      this.stack = data.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
