import { Component, Input } from '@angular/core';
import { Message, MessageStatus } from '../chat-store/chat.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() authenticatedUserId!: string | null;
  @Input() authenticatedUsername!: string | null;
  protected readonly MessageStatus = MessageStatus;
}
