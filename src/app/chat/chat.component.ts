import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { LoginStore } from '../store/login/login.store';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { Message } from './chat-store/chat.model';
import { ChatService } from './chat-store/chat.service';
import { ChatStore } from './chat-store/chat.store';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatStore],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessageComponent,
    ChatHeaderComponent,
  ],
})
export class ChatComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  protected readonly form = this.fb.nonNullable.group({
    message: ['', Validators.required],
  });
  protected readonly messages$: Observable<Message[]> = this.store.allMessages$;
  protected readonly username$: Observable<string | null> =
    this.loginStore.username$;

  constructor(
    private fb: FormBuilder,
    private readonly store: ChatStore,
    private chatService: ChatService,
    private loginStore: LoginStore
  ) {}

  ngOnInit(): void {
    this.chatService.messageEvents$
      .pipe(takeUntil(this.onDestroy$))
      .pipe(tap(messages => this.store.addMessages(messages)))
      .subscribe();

    this.chatService.userJoinedEvents$
      .pipe(takeUntil(this.onDestroy$))
      .pipe(tap(user => this.store.addUser(user)))
      .subscribe();

    this.chatService.userLeftEvents$
      .pipe(takeUntil(this.onDestroy$))
      .pipe(tap(userId => this.store.setUserOffline(userId)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  sendMessage(): void {
    this.store.sendMessage({ body: this.form.controls.message.value });
    this.form.controls.message.patchValue('');
  }

  onUsernameChange(newUsername: string): void {
    this.loginStore.changeUsername(newUsername);
  }
}
