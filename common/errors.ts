export type ErrorType = {
  name: string;
  message: string;
  stack?: string;
};

export type ExceptionError = ErrorType | any;
