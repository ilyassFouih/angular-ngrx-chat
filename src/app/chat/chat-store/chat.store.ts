import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
  Update,
} from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, pairwise, tap } from 'rxjs/operators';
import { linkToGlobalState } from 'src/app/core/global.store';
import { environment } from 'src/environments/environment';
import { Message, MessageStatus, User, UserStatus } from './chat.model';
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

  constructor(private chatService: ChatService, private store: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'ChatStore', this.store);
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

  // user joined
  readonly addUser = this.effect((addUser$: Observable<User>) => {
    return addUser$.pipe(
      tap(user =>
        this.setState(state => ({
          ...state,
          users: userAdapter.addOne(
            { ...user, status: user.status ?? UserStatus.ONLINE },
            state.users
          ),
        }))
      )
    );
  });

  readonly updateUser = this.effect((updateUser$: Observable<Update<User>>) => {
    return updateUser$.pipe(
      tap(userChanges =>
        this.setState(state => ({
          ...state,
          users: userAdapter.updateOne(userChanges, state.users),
        }))
      )
    );
  });

  readonly setUserOffline = this.effect(
    (setUserOffline$: Observable<string>) => {
      return setUserOffline$.pipe(
        map(userId =>
          this.updateUser({
            id: userId,
            changes: { status: UserStatus.OFFLINE },
          })
        )
      );
    }
  );

  readonly getUserById = (userId: string) => {
    return this.select(state => state.users.entities[userId]);
  };
}
