import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of, Subject } from 'rxjs';
import {
  Message,
  WebSocketMessageEvent,
  User,
  WebSocketEvents,
  WebSocketMessageEvents,
  WebSocketUserJoinedEvent,
  WebSocketUserLeftEvent,
  MessageStatus,
} from './chat.model';

const isMessageEvent = (
  event: WebSocketMessageEvents
): event is WebSocketMessageEvent => {
  return event.type === WebSocketEvents.MESSAGE;
};

const isUserJoinedEvent = (
  event: WebSocketMessageEvents
): event is WebSocketUserJoinedEvent => {
  return event.type === WebSocketEvents.USER_JOINED;
};

const isUserLeftEvent = (
  event: WebSocketMessageEvents
): event is WebSocketUserLeftEvent => {
  return event.type === WebSocketEvents.USER_LEFT;
};

const createRandomMessage = (): Message => {
  return {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(), // to-do: actual user
    body: crypto.randomUUID(),
    time: new Date().getTime(),
  };
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // to-do: use an actual websocket connected to a backend
  private readonly webSocketEvents$ = new Subject<
    MessageEvent<WebSocketMessageEvents>
  >();
  private readonly webSocketMessageEvents$: Observable<WebSocketMessageEvents> =
    this.webSocketEvents$.pipe(map(event => event.data));

  readonly messageEvents$: Observable<Message[]> =
    this.webSocketMessageEvents$.pipe(
      filter(isMessageEvent),
      map(event => event.data)
    );
  readonly userJoinedEvents$: Observable<User> =
    this.webSocketMessageEvents$.pipe(
      filter(isUserJoinedEvent),
      map(event => event.data)
    );
  readonly userLeftEvents$: Observable<string> =
    this.webSocketMessageEvents$.pipe(
      filter(isUserLeftEvent),
      map(event => event.data)
    );

  constructor(private http: HttpClient) {
    // generate random messages every 3s
    setInterval(
      () =>
        this.webSocketEvents$.next(
          new MessageEvent('message', {
            data: {
              type: WebSocketEvents.MESSAGE,
              data: [createRandomMessage()],
            },
          })
        ),
      3000
    );
  }

  // simulating an api call that returns created message with real id and time
  // to-do: connect to actual api
  sendMessage(message: { userId: string; body: string }): Observable<Message> {
    const response: Message = {
      body: message.body,
      userId: message.userId,
      id: crypto.randomUUID(),
      time: new Date().getTime(),
      status: MessageStatus.OK,
    };

    return of(response).pipe(delay(3000));
  }
}
