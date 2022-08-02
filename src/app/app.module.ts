import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './store/login/login.reducer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ login: loginReducer }),
    ChatComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
