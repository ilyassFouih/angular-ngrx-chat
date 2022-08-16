import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Message, MessageStatus, UserStatus } from '../chat-store/chat.model';
import { UserDataPipe } from './user-data.pipe';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [CommonModule, UserDataPipe],
})
export class MessageComponent implements OnChanges {
  @Input() message!: Message;
  @Input() authUserName!: string | null;
  @Input() authUserId!: string | null;

  isExternalMessage!: boolean;
  protected PENDING = MessageStatus.PENDING;
  protected ONLINE = UserStatus.ONLINE;

  ngOnChanges({ message, authUserId }: SimpleChanges): void {
    if (message && authUserId)
      this.isExternalMessage = this.message.userId !== this.authUserId;
  }
}
