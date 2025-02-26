import { NgModule } from '@angular/core';
import { CoinsPageRoutingModule } from './coins-page.routing.module';
import { CoinsPageComponent } from './coins-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PageHeaderComponent } from '@shared/component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VIMatModule } from '@ts-core/angular-material';

@NgModule({
    imports: [
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        CoinsPageRoutingModule,

        VIMatModule,

        PageHeaderComponent
    ],
    declarations: [CoinsPageComponent]
})
export default class CoinsPageModule { }

