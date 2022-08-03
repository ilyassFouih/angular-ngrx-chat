export enum MessageStatus {
  PENDING = 'PENDING',
  OK = 'OK',
}

export interface Message {
  id: string;
  userId: string;
  body: string;
  time: number;
  status?: MessageStatus;
}

export interface User {
  id: string;
  name: string;
}

export enum WebSocketEvents {
  MESSAGE = 'MESSAGE',
  USER_JOINED = 'USER_JOINED',
  USER_LEFT = 'USER_LEFT',
}

export type WebSocketMessageEvents =
  | WebSocketMessageEvent
  | WebSocketUserJoinedEvent
  | WebSocketUserLeftEvent;

export interface WebSocketMessageEvent {
  type: WebSocketEvents.MESSAGE;
  data: Message[];
}

export interface WebSocketUserJoinedEvent {
  type: WebSocketEvents.USER_JOINED;
  data: User;
}

export interface WebSocketUserLeftEvent {
  type: WebSocketEvents.USER_LEFT;
  data: string;
}
