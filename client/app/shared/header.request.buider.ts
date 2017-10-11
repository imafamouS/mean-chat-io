import { Headers } from '@angular/http';

export class HeaderBuilder{
	private headerContent;

	constructor(){
	}

	getHeaderWithToken(){
		const token = localStorage.getItem('token');
		this.headerContent = { 'Content-Type': 'application/json', 'charset': 'UTF-8', 'token':token };
		return new Headers(this.headerContent);
	}

	getDefaultHeader(){
		this.headerContent = { 'Content-Type': 'application/json', 'charset': 'UTF-8'};
		return new Headers(this.headerContent);
	}
}