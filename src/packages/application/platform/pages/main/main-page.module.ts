
import { NgModule } from '@angular/core';
import { MainPageRoutingModule } from './main-page.routing.module';
import { MainPageComponent } from './main-page.component';
import { VIMatModule } from '@ts-core/angular-material';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        MatIconModule,
        
        VIMatModule,
        MainPageRoutingModule,
    ],
    declarations: [MainPageComponent]
})
export default class MainPageModule { }
