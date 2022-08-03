import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { mergeMap, pairwise, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message, MessageStatus, User } from './chat.model';
import { ChatService } from './chat.service';

export interface ChatState {
  userId: string; // to-do: should probably be removed from here and used from the global store
  messages: { loading: boolean } & EntityState<Message>;
  users: { loading: boolean } & EntityState<User>;
}

function sortByTime(a: Message, b: Message): 1 | -1 {
  return a.time < b.time ? -1 : 1;
}

function sortByName(a: User, b: User): number {
  return a.name.localeCompare(b.name);
}

const messageAdapter: EntityAdapter<Message> = createEntityAdapter<Message>({
  sortComparer: sortByTime,
});

const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  sortComparer: sortByName,
});

const initialState: ChatState = {
  userId: '',
  messages: messageAdapter.getInitialState({
    loading: false,
  }),
  users: userAdapter.getInitialState({
    loading: false,
  }),
};

const { selectAll: selectAllMessages } = messageAdapter.getSelectors();
const { selectAll: selectAllUsers } = userAdapter.getSelectors();

@Injectable()
export class ChatStore extends ComponentStore<ChatState> {
  private readonly logging$ = this.select(state => state).pipe(
    pairwise(),
    tap(([prev, curr]) => console.table({ prev, curr }))
  );
  readonly userId$ = this.select(state => state.userId);
  readonly messages$ = this.select(state => state.messages);
  readonly allMessages$ = this.select(this.messages$, selectAllMessages);
  readonly loadingMessages$ = this.select(state => state.messages.loading);
  readonly users$ = this.select(state => state.users);
  readonly allUsers$ = this.select(this.users$, selectAllUsers);
  readonly loadingUsers$ = this.select(state => state.users.loading);

  constructor(private chatService: ChatService) {
    super(initialState);
    if (!environment.production) {
      this.logging$.subscribe();
    }
  }

  readonly sendMessage = this.effect(
    (sendMessage$: Observable<{ body: string }>) => {
      return sendMessage$.pipe(
        concatLatestFrom(() => [
          // creates a random ID and a time to show message as soon as user sends it, even though it is pending
          of({ id: crypto.randomUUID(), time: new Date().getTime() }),
          // to-do: get current user id from global store?
          this.userId$,
        ]),
        tap(([{ body }, { id, time }, userId]) =>
          this.setState(state => ({
            ...state,
            messages: messageAdapter.addOne(
              { id, userId, body, time, status: MessageStatus.PENDING },
              state.messages
            ),
          }))
        ),
        mergeMap(([{ body }, { id: previousId }, userId]) =>
          this.chatService.sendMessage({ body, userId }).pipe(
            // updating previously inserted message before api call
            tap(message =>
              this.setState(state => ({
                ...state,
                messages: messageAdapter.mapOne(
                  { id: previousId, map: () => message },
                  state.messages
                ),
              }))
            )
          )
        )
      );
    }
  );

  readonly addMessages = this.effect((addMessages$: Observable<Message[]>) => {
    return addMessages$.pipe(
      tap(messages =>
        this.setState(state => ({
          ...state,
          messages: messageAdapter.addMany(messages, state.messages),
        }))
      )
    );
  });

  // to-do: user joined (websocket event)
  // to-do: user left (websocket event)
}
