import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '**', redirectTo: '/login' },
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)],
	providers: [],
	bootstrap: [],
	exports: [RouterModule]
})

export class RoutingModule { }
