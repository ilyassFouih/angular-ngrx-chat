import { Component, Input } from '@angular/core';
import { Message, MessageStatus } from 'src/app/store/chat/chat.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {
  @Input() message!: Message;
  @Input() authenticatedUserId!: string | null;
  @Input() authenticatedUsername!: string | null;
  protected readonly MessageStatus = MessageStatus;
}
