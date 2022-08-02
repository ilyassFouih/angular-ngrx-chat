import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class ChatComponent {
  protected readonly form = this.fb.nonNullable.group({
    message: ['', Validators.required],
  });
  protected readonly messages$ = this.store.allMessages$;

  constructor(private fb: FormBuilder, private readonly store: ChatStore) {}

  sendMessage(): void {
    this.store.sendMessage({ body: this.form.controls.message.value });
    this.form.controls.message.patchValue('');
  }
}
