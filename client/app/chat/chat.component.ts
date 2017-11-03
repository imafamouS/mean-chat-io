import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
	MAX_LENGTH:Number = environment.config.chat.max_length;

	currentMessage: String;
	messageList = [];

	constructor() { }

	ngOnInit() {
	}

	clicked(event) {
		console.log(this.currentMessage);
		if(this.currentMessage && this.currentMessage.length <= this.MAX_LENGTH){
			this.messageList.push(this.currentMessage);
			this.currentMessage = "";
		}
	}

}
