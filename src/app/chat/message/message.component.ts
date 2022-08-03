import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Message, MessageStatus } from '../chat-store/chat.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MessageComponent implements OnInit {
  @Input() message!: Message;
  protected readonly MessageStatus = MessageStatus;

  constructor() {}

  ngOnInit(): void {}
}
