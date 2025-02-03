
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AboutPageComponent } from './about-page.component';
import { AboutPageRoutingModule } from './about-page.routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [MatSelectModule, MatInputModule, SharedModule, AboutPageRoutingModule],
    declarations: [AboutPageComponent]
})
export default class AboutPageModule { }
