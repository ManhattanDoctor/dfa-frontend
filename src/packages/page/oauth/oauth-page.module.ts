import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OAuthPageRoutingModule } from './oauth-page.routing.module';
import { OAuthPageComponent } from './oauth-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, OAuthPageRoutingModule],
    declarations: [OAuthPageComponent]
})
export default class OAuthPageModule { }