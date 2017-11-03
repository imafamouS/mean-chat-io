import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ChatComponent } from './chat/chat.component';

import { AuthGuardLogin } from './services/auth-guard-login.service';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: '404', component: NotfoundComponent },
	{ path: 'chat', component: ChatComponent}
	//{ path: '**', redirectTo: '/404' }
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)],
	providers: [],
	bootstrap: [],
	exports: [RouterModule]
})

export class RoutingModule { }
