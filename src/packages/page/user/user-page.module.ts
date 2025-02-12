
import { NgModule } from '@angular/core';
import { UserPageRoutingModule } from './user-page.routing.module';
import { UserPageComponent } from './user-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PageHeaderComponent, UserDetailsComponent } from '@shared/component';

@NgModule({
    imports: [
        MatMenuModule,
        MatInputModule,
        UserPageRoutingModule,

        PageHeaderComponent,
        UserDetailsComponent
    ],
    declarations: [UserPageComponent]
})
export default class UserPageModule { }
