
import { NgModule } from '@angular/core';
import { MainPageRoutingModule } from './main-page.routing.module';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        MainPageRoutingModule,
        SharedModule,
    ],
    declarations: [MainPageComponent]
})
export default class MainPageModule { }
