import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../chat-store/chat.model';
import { ChatStore } from '../chat-store/chat.store';

@Pipe({
  name: 'userData',
})
export class UserDataPipe implements PipeTransform {
  constructor(private store: ChatStore) {}

  public transform(userId: string): Observable<User | undefined> {
    return this.store.getUserById(userId);
  }
}
