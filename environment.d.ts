declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TG_TOKEN: string;
      NODE_ENV: string;
      MYSQL_HOST: string;
      MYSQL_DATABASE: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_ROOT_PASSWORD: string;
      PORT?: string;
    }
  }
}

export {};
