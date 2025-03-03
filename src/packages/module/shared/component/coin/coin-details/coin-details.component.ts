import { Component, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Coin } from '@common/platform/coin';
import { VIMatModule } from '@ts-core/angular-material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { UpdatableComponent } from '@shared/component';
import { TransportSocket } from '@ts-core/socket-client';
import { getSocketCoinRoom } from '@common/platform';
import * as _ from 'lodash';

@Component({
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,

        VIMatModule
    ],
    selector: 'coin-details',
    templateUrl: 'coin-details.component.html',
})
export class CoinDetailsComponent extends UpdatableComponent<Coin> {

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private socket: TransportSocket) {
        super();
        ViewUtil.addClasses(container, 'row gy-0 gx-3 align-self-start');
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    protected itemOpenedHandler(item: Coin): void {
        this.socket.roomAdd(getSocketCoinRoom(item.id));
    }

    protected itemClosedHandler(item: Coin): void {
        this.socket.roomRemove(getSocketCoinRoom(item.id));
    }
}
