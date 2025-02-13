
import { NgModule } from '@angular/core';
import { UserPageRoutingModule } from './user-page.routing.module';
import { UserPageComponent } from './user-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PageHeaderComponent, UserDetailsComponent } from '@shared/component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VIMatModule } from '@ts-core/angular-material';

@NgModule({
    imports: [
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        UserPageRoutingModule,

        VIMatModule,

        PageHeaderComponent,
        UserDetailsComponent
    ],
    declarations: [UserPageComponent]
})
export default class UserPageModule { }
