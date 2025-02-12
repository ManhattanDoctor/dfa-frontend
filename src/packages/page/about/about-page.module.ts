
import { NgModule } from '@angular/core';
import { AboutPageComponent } from './about-page.component';
import { AboutPageRoutingModule } from './about-page.routing.module';
import { PageHeaderComponent } from '@shared/component';
import { VIMatModule } from '@ts-core/angular-material';

@NgModule({
    imports: [
        AboutPageRoutingModule,
        VIMatModule,

        PageHeaderComponent
    ],
    declarations: [AboutPageComponent]
})
export default class AboutPageModule { }
