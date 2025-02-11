
import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page.routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    imports: [
        MatInputModule,
        MatMenuModule,
        ProfilePageRoutingModule,
    ],
    declarations: [ProfilePageComponent]
})
export default class ProfilePageModule { }
