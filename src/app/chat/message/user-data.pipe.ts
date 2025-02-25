import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../chat-store/chat.model';
import { ChatStore } from '../chat-store/chat.store';

@Pipe({
  name: 'userData',
  standalone: true,
})
export class UserDataPipe implements PipeTransform {
  constructor(private readonly store: ChatStore) {}

  public transform(userId: string): Observable<User | undefined> {
    return this.store.getUserById(userId);
  }
}
