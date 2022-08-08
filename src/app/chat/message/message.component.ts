import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Message, MessageStatus } from '../chat-store/chat.model';
import { UserDataPipe } from './user-data.pipe';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [CommonModule, UserDataPipe],
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() authenticatedUserId?: string | null;
  protected readonly MessageStatus = MessageStatus;
}
