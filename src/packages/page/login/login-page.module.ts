import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-page.routing.module';
import { LoginPageComponent } from './login-page.component';
import { LoginModule } from '@feature/login';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        MatIconModule,

        LoginModule,
        LoginPageRoutingModule,
    ],
    declarations: [LoginPageComponent]
})
export default class LoginPageModule { }