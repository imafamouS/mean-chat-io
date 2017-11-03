import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SlideLeft2Right } from '../shared/animation/index';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	animations: [SlideLeft2Right],
	host: { '[@SlideLeft2Right]': '' }
})
export class RegisterComponent implements OnInit {
	public toastConfig: ToasterConfig = new
		ToasterConfig({
			showCloseButton: true,
			tapToDismiss: true,
		});

	registerForm: FormGroup;
	username: FormControl;
	password: FormControl;

	constructor(private formBuilder: FormBuilder,
		private authService: AuthService,
		private userService: UserService,
		private router: Router,
		private toastService: ToasterService) {
		this.username = new FormControl('', [Validators.required,
		Validators.minLength(3),
		Validators.maxLength(100)]);
		this.password = new FormControl('', [Validators.required,
		Validators.minLength(8)]);
		this.registerForm = formBuilder.group({
			username: this.username,
			password: this.password
		});
	}

	ngOnInit() {
		if (this.authService.loggedIn) {
			this.router.navigate(['/']);
		}
	}

	register() {
		this.userService.register(this.registerForm.value)
			.map(res => res.json())
			.subscribe(
			res => {
				if (res.success) {
					this.toastService.pop('success', 'Register', 'Register successful!');
					setTimeout(() => {
						this.router.navigate(['/login']);
					}, 2000);
				} else {
					this.handlerError(res.errors);
				}
			},
			err => { }
			);
	}

	openSignIn() {
		this.router.navigate(['/login']);
	}


	handlerError(errors) {
		if (!Array.isArray(errors)) {
			this.toastService.pop('error', errors.name, errors.property);
			return;
		}
		for (let err of errors) {
			if (err.property.message) {
				this.toastService.pop('error', err.name, err.property.message);
			} else {
				this.toastService.pop('error', err.name, err.property);
			}
		}
	}
}
