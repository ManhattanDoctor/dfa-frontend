import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-page.routing.module';
import { LoginPageComponent } from './login-page.component';
import { LoginModule } from '@feature/login';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,

        LoginModule,
        LoginPageRoutingModule,
    ],
    declarations: [LoginPageComponent]
})
export default class LoginPageModule { }