import TelegramBot from 'node-telegram-bot-api';

export interface ICreateStreamQuery {
  leagueId: LeagueId;
  startTime?: string;
  endTime?: string;
  location?: string;
}

export interface IUpdateStreamQuery {
  ended?: boolean;
  endTime?: string;
  location?: string;
  startTime?: string;
}

export type StreamId = number;
export type LeagueId = number;

export interface ICreatePasscodeQuery {
  streamId: StreamId;
  passcode: string;
}

export enum Role {
  Host = 'host',
  'Co-Host' = 'co-host',
  Techinican = 'techinican',
}
export interface ICreateUserQuery {
  description?: string;
  name?: string;
  streamId: StreamId;
  role: Role;
  telegramChatId: string | number;
}

export interface ICreateTeamQuery {
  name?: string;
  abbreviation?: string;
}
