import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/chat/chat.model';
import { selectUserById } from 'src/app/store/chat/chat.selectors';

@Pipe({
  name: 'userData',
})
export class UserDataPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(userId: string): Observable<User | undefined> {
    return this.store.select(selectUserById(userId));
  }
}
