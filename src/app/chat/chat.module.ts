import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatHeaderModule } from './chat-header/chat-header.module';
import { ChatComponent } from './chat.component';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { StoreModule } from '@ngrx/store';
import { chatFeature } from '../store/chat/chat.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from '../store/chat/chat.effects';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ChatComponent }];

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature(chatFeature),
    EffectsModule.forFeature([ChatEffects]),
    ChatHeaderModule,
    ChatMessageModule,
  ],
})
export class ChatModule {}
