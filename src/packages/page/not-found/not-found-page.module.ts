
import { NgModule } from '@angular/core';
import { NotFoundPageRoutingModule } from './not-found-page.routing.module';
import { NotFoundPageComponent } from './not-found-page.component';
import { VIMatModule } from '@ts-core/angular-material';

@NgModule({
    imports: [
        VIMatModule,

        NotFoundPageRoutingModule
    ],
    declarations: [NotFoundPageComponent]
})
export default class NotFoundPageModule { }