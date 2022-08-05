import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ChatHeaderComponent implements OnInit, OnChanges {
  @Output() usernameChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() username?: string | null;

  protected readonly form = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(20)],
    ],
  });

  editUsername = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(console.log);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.controls.username.patchValue(changes?.['username']?.currentValue);
  }

  onEditUsername(): void {
    this.editUsername = !this.editUsername;
  }

  submitEditedUsenrame(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.usernameChange.emit(this.form.controls.username.value);
  }
}
