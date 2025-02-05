import { NgModule } from '@angular/core';
import { OAuthPageRoutingModule } from './oauth-page.routing.module';
import { OAuthPageComponent } from './oauth-page.component';
import { VIModule } from '@ts-core/angular';

@NgModule({
    imports: [
        VIModule,
        OAuthPageRoutingModule
    ],
    declarations: [OAuthPageComponent]
})
export default class OAuthPageModule { }