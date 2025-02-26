
import { NgModule } from '@angular/core';
import { UserPageRoutingModule } from './user-page.routing.module';
import { UserPageComponent } from './user-page.component';
import { UserContainerComponent } from '@shared/component';

@NgModule({
    imports: [
        UserPageRoutingModule,
        UserContainerComponent,
    ],
    declarations: [UserPageComponent]
})
export default class UserPageModule { }
