
import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page.routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProfilePageComponent } from './profile-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileModule } from '@feature/profile';

@NgModule({
    imports: [
        FormsModule,
        MatInputModule,
        MatMenuModule,
        ProfilePageRoutingModule,

        SharedModule,
        ProfileModule
    ],
    declarations: [ProfilePageComponent]
})
export default class ProfilePageModule { }
