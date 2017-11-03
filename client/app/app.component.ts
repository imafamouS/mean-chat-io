import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as IO from "socket.io-client";
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'fdsafsdafsda';
	socket = IO(environment.config.socket.base_url);

	constructor() {
		console.log('AppComponent');
		this.socket.emit('private message', { hello: "world" });
	}
}
