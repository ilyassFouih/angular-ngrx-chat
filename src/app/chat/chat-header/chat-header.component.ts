import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoginStore } from 'src/app/store/login/login.store';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ChatHeaderComponent implements OnInit, OnDestroy {
  protected readonly form = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(20)],
    ],
  });

  editUsername = false;

  protected readonly username$: Observable<string | null> =
    this.loginStore.username$;

  private onDestroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private loginStore: LoginStore) {}

  ngOnInit(): void {
    this.username$.pipe(takeUntil(this.onDestroy$)).subscribe(username => {
      this.form.controls.username.patchValue(username ?? '');
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onEditUsername(): void {
    this.editUsername = !this.editUsername;
  }

  submitEditedUsername(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.onEditUsername();
    const newUsername = this.form.controls.username.value;
    this.loginStore.changeUsername(newUsername);
  }
}
