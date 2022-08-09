import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginStore } from '../store/login/login.store';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { Message } from './chat-store/chat.model';
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
export class ChatComponent implements OnInit {
  protected readonly form = this.fb.nonNullable.group({
    message: ['', Validators.required],
  });
  protected readonly messages$: Observable<Message[]> = this.store.allMessages$;

  userId$!: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private readonly store: ChatStore,
    private loginStore: LoginStore
  ) {}

  ngOnInit(): void {
    this.userId$ = this.loginStore.userId$;
  }

  sendMessage(): void {
    this.store.sendMessage({ body: this.form.controls.message.value });
    this.form.controls.message.patchValue('');
  }
}
