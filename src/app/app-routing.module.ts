import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';

// to-do: add login route
const routes: Routes = [
  { path: '', redirectTo: 'chat',  pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent},
  { path: '**', redirectTo: 'chat'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
