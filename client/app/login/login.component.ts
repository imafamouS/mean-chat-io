import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	username: FormControl;
	password: FormControl;

	constructor(private builder: FormBuilder, 
				private authService: AuthService,
				private router: Router) {
		this.username = new FormControl('', [Validators.required,
											Validators.minLength(3),
											Validators.maxLength(100)]);
		this.password = new FormControl('', [Validators.required,
											Validators.minLength(6)]);
		this.loginForm = builder.group({
			username: this.username,
			password: this.password
		});
	}

	ngOnInit() {
		if (this.authService.loggedIn) {
      		this.router.navigate(['/']);
  	  	}
	}

	login() {
		this.authService.login(this.loginForm.value).subscribe(
			res => this.router.navigate(['/'],{queryParams: {islogin: true}}),
			error => console.log('login component:' + error)
		);
	}
}
