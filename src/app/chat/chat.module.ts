import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatHeaderModule } from './chat-header/chat-header.module';
import { ChatComponent } from './chat.component';
import { ChatMessageModule } from './chat-message/chat-message.module';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatHeaderModule,
    ChatMessageModule,
  ],
})
export class ChatModule {}
