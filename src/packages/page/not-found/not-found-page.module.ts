
import { NgModule } from '@angular/core';
import { NotFoundPageRoutingModule } from './not-found-page.routing.module';
import { NotFoundPageComponent } from './not-found-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [SharedModule, NotFoundPageRoutingModule],
    declarations: [NotFoundPageComponent]
})
export default class NotFoundPageModule { }