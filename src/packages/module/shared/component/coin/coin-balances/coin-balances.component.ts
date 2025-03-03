import { Component, ViewContainerRef, Input } from '@angular/core';
import { ICdkTableRowEvent, ICdkTableSettings, VIMatModule } from '@ts-core/angular-material';
import { Transport } from '@ts-core/common';
import { CoinBalanceMapCollection, CoinBalanceObjectTableSettings, CoinBalanceTableSettings } from '@core/lib/coin';
import { EntityService, PipeService } from '@core/service';
import { ViewUtil } from '@ts-core/angular';
import { TransportSocket } from '@ts-core/socket-client';
import { map, takeUntil } from 'rxjs';
import { CoinBalanceChangedEvent } from '@common/platform/transport';
import { CoinBalance } from '@common/platform/coin';
import { getSocketCoinBalanceRoom } from '@common/platform';
import { UpdatableComponent } from '@shared/component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { EntityOpenCommand } from '@feature/entity/transport';
import { EntityType } from '@feature/entity';
import * as _ from 'lodash';

@Component({
    imports: [
        MatIconModule,
        MatMenuModule,
        MatButtonModule,

        VIMatModule,
    ],
    selector: 'coin-balances',
    templateUrl: 'coin-balances.component.html',
    providers: [CoinBalanceMapCollection]
})
export class CoinBalancesComponent extends UpdatableComponent<string> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _coinUid: string;

    @Input()
    public settings: ICdkTableSettings<CoinBalance>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(element: ViewContainerRef, private pipe: PipeService, private transport: Transport, private entity: EntityService, public items: CoinBalanceMapCollection, private socket: TransportSocket) {
        super();
        ViewUtil.addClasses(element.element, 'd-flex');

        socket.getDispatcher<CoinBalanceChangedEvent>(CoinBalanceChangedEvent.NAME)
            .pipe(
                map(item => item.data),
                // filter(item => item.objectUid === this.item),
                takeUntil(this.destroyed)
            ).subscribe(() => this.items.reload());
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private commitCoinUidProperties(): void {
        this.settings = new CoinBalanceObjectTableSettings(this.pipe, this.entity);
        this.items.conditions.coinUid = this.coinUid;
        this.items.reload();
    }

    protected commitItemProperties(): void {
        super.commitItemProperties();
        this.settings = new CoinBalanceTableSettings(this.pipe);
        this.items.conditions.objectUid = this.item;
        this.items.reload();
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async rowClickedHandler(item: ICdkTableRowEvent<CoinBalance>): Promise<void> {
        this.transport.send(new EntityOpenCommand({ id: item.data.coinUid, type: EntityType.COIN, isBriefly: true }));
    }

    protected itemOpenedHandler(item: string): void {
        this.socket.roomAdd(getSocketCoinBalanceRoom(item));
    }

    protected itemClosedHandler(item: string): void {
        this.socket.roomRemove(getSocketCoinBalanceRoom(item));
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.item = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get coinUid(): string {
        return this._coinUid;
    }
    @Input()
    public set coinUid(value: string) {
        if (value === this._coinUid) {
            return;
        }
        this._coinUid = value;
        if (!_.isNil(value)) {
            this.commitCoinUidProperties();
        }
    }
}
