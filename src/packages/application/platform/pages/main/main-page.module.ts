
import { NgModule } from '@angular/core';
import { MainPageRoutingModule } from './main-page.routing.module';
import { MainPageComponent } from './main-page.component';
import { VIMatModule } from '@ts-core/angular-material';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        
        VIMatModule,
        MainPageRoutingModule,
    ],
    declarations: [MainPageComponent]
})
export default class MainPageModule { }
