class ApiError extends Error {
  public statusCode: number;
  public message: string;
  public errors: any[];
  public stack = "";

  constructor(
    statusCode: number,
    message: string | any = "Something went wrong!",
    errors: any[] = [],
    stack: string = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.stack = stack;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
