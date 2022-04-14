export enum Env {
  development = "development",
  production = "production",
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TG_TOKEN: string;
      NODE_ENV: Env;
      MYSQL_HOST: string;
      MYSQL_DATABASE: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_ROOT_PASSWORD: string;
      PORT?: string;
    }
  }
}
