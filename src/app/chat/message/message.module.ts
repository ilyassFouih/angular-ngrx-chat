import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message.component';
import { UserDataPipe } from './user-data.pipe';

@NgModule({
  declarations: [MessageComponent, UserDataPipe],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MessageComponent, UserDataPipe],
})
export class MessageModule {}
