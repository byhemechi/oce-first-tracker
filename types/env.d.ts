declare namespace NodeJS {
  export interface ProcessEnv {
    DISCORD_ID: string;
    DISCORD_CHANNEL: string;
    DISCORD_LOG_CHANNEL: string;
    DISCORD_TOKEN: string;
    SERVER_ID: string;
    WEBSITE_HOST?: string;
    COUNTRIES: string;
  }
}
