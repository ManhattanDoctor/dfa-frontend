import { NgModule } from '@angular/core';
import { UsersPageRoutingModule } from './users-page.routing.module';
import { UsersPageComponent } from './users-page.component';
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
        UsersPageRoutingModule,

        VIMatModule,

        PageHeaderComponent
    ],
    declarations: [UsersPageComponent]
})
export default class UsersPageModule { }

