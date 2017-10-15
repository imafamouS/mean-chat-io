import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    ToasterModule,
    RoutingModule,
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuardLogin
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
