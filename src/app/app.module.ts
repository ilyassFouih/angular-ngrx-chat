import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './store/login/login.reducer';

@NgModule({
  declarations: [AppComponent, LoginComponent, ChatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ login: loginReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
