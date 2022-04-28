declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}

// DOTENV VARIABLES
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGODB_URL: string;
    JWT_SECRET: string;
    CRYPTO_SECRET: string;
  }
}
