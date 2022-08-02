import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Message } from './chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  // to-do: client should receive message events that trigger store updates

  // simulating an api call that returns created message with real id and time
  // to-do: connect to actual api
  sendMessage(message: { userId: string; body: string }): Observable<Message> {
    const response: Message = {
      body: message.body,
      userId: message.userId,
      id: crypto.randomUUID(),
      time: new Date().getTime(),
      status: 'OK',
    };

    return of(response).pipe(delay(3000));
  }
}
