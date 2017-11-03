import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';

import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { SlideLeft2Right } from '../shared/animation/index';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	animations: [SlideLeft2Right],
	host: { '[@SlideLeft2Right]': '' }
})
export class LoginComponent implements OnInit {
	public toastConfig: ToasterConfig = new
		ToasterConfig({
			showCloseButton: true,
			tapToDismiss: true
		});

	loginForm: FormGroup;
	username: FormControl;
	password: FormControl;


	constructor(private builder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private toastService: ToasterService
	) {
		
	}

	ngOnInit() {
		if (this.authService.loggedIn) {
			this.router.navigate(['/']);
		}
		this.username = new FormControl('', [Validators.required,
												Validators.minLength(4),
												Validators.maxLength(100)]);
		this.password = new FormControl('', [Validators.required,
												Validators.minLength(8)]);
		this.loginForm = this.builder.group({
			username: this.username,
			password: this.password
		});
	}

	login() {

		this.authService.login(this.loginForm.value)
			.subscribe(
			res => {
				this.toastService.pop('success', 'Login', 'Successful');
				this.router.navigate(['/']);
			},
			error => this.toastService.pop('error', 'Login', 'Username or password is wrong !')
			);
	}
	openSignUp() {
		this.router.navigate(['/register']);
	}
}
