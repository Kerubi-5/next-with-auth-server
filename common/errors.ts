export type ErrorType = {
  name: string;
  message: string;
  stack?: string;
};

export type Error = ErrorType | any;
