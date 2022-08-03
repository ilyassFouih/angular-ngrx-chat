import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChatService } from './chat-store/chat.service';
import { ChatStore } from './chat-store/chat.store';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatStore],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageComponent],
})
export class ChatComponent implements OnInit, OnDestroy {
  protected readonly form = this.fb.nonNullable.group({
    message: ['', Validators.required],
  });
  protected readonly messages$ = this.store.allMessages$;
  private onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private readonly store: ChatStore,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.messageEvents$
      .pipe(takeUntil(this.onDestroy$))
      .pipe(tap((messages) => this.store.addMessages(messages)))
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
}
