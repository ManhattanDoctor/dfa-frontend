
import { NgModule } from '@angular/core';
import { CoinPageRoutingModule } from './coin-page.routing.module';
import { CoinPageComponent } from './coin-page.component';
import { CoinContainerComponent } from '@shared/component';

@NgModule({
    imports: [
        CoinPageRoutingModule,
        CoinContainerComponent,
    ],
    declarations: [CoinPageComponent]
})
export default class CoinPageModule { }
