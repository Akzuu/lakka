import { ChatId } from 'node-telegram-bot-api';

export interface ICreateStreamQuery {
  endTime?: string;
  leagueId?: LeagueId;
  location?: string;
  startTime?: string;
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
  activeUntil: string;
  passcode: string;
  streamId: StreamId;
}

export enum Role {
  'Co-Host' = 'co-host',
  Host = 'host',
  Techinican = 'techinican',
}
export interface ICreateUserQuery {
  description?: string;
  name: string;
  telegramChatId: string | number;
}

export interface ICreateTeamQuery {
  abbreviation?: string;
  name?: string;
}

export type UserId = number;
export interface ICreateUserLinkToStream {
  streamId: StreamId;
  userId: UserId;
}

export interface IUser {
  createdAt: string;
  description?: string;
  id: number;
  name: string;
  telegramChatId: ChatId;
  updatedAt: string;
}
