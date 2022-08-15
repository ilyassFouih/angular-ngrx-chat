import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from './chat-message.component';
import { UserDataPipe } from './user-data.pipe';

@NgModule({
  declarations: [ChatMessageComponent, UserDataPipe],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ChatMessageComponent, UserDataPipe],
})
export class ChatMessageModule {}
